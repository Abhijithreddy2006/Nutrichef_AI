import type { VercelRequest, VercelResponse } from '@vercel/node'

// ── NutriChef AI System Prompt ──
const SYSTEM_PROMPT = `You are a world-class professional chef and culinary developer for NutriChef AI. Given a list of available ingredients a user has on hand in their fridge or pantry, you generate a practical, mouth-watering recipe using those ingredients as the main elements.

CRITICAL INSTRUCTION: You MUST return ONLY a single, valid JSON object — absolutely NO markdown code fences (no \`\`\`json), NO introduction, NO explanation, and NO extra text.

The JSON MUST strictly conform to this structure:

{
  "title": "string — creative, appetizing recipe name",
  "description": "string — compelling 2-3 sentence overview highlighting flavors and texture",
  "prepTime": "string — e.g. '10 mins'",
  "cookTime": "string — e.g. '20 mins'",
  "baseServings": number — positive integer between 1 and 8 (e.g. 2),
  "ingredients": [
    {
      "id": "ing_1",
      "name": "ingredient name (e.g. eggs, rice, olive oil)",
      "originalAmount": 2,
      "unit": "e.g. large, cup, tbsp, g, oz, clove, or empty string '' for whole items",
      "category": "one of: protein | vegetable | grain | dairy | fat | seasoning | sauce | fruit | other"
    }
  ],
  "swaps": [
    {
      "originalIngredient": "ingredient name to substitute",
      "recommendedSwap": "practical substitute item",
      "reason": "brief culinary explanation why this swap works well"
    }
  ],
  "instructions": [
    {
      "stepNumber": 1,
      "text": "Clear, actionable step instruction.",
      "tip": "Optional pro chef tip string or null"
    }
  ]
}

Rules:
1. Make sure all returned numbers for originalAmount and baseServings are positive numbers (not strings).
2. Category must strictly be one of: protein, vegetable, grain, dairy, fat, seasoning, sauce, fruit, other.
3. Provide 3-5 smart ingredient swaps for key ingredients or common household variations.
4. Provide 4-8 clear, step-by-step cooking instructions.
5. Return ONLY valid JSON.`

async function readBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
    req.on('error', reject)
  })
}

function sendJson(res: VercelResponse, status: number, data: unknown) {
  res.status(status).json(data)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    let ingredients: string | undefined

    if (req.body) {
      if (typeof req.body === 'string') {
        try {
          const parsed = JSON.parse(req.body) as { ingredients?: string }
          ingredients = parsed.ingredients
        } catch {
          // ignore json parse error
        }
      } else if (typeof req.body === 'object') {
        ingredients = (req.body as { ingredients?: string }).ingredients
      }
    }

    if (!ingredients) {
      try {
        const rawBody = await readBody(req)
        if (rawBody) {
          const parsed = JSON.parse(rawBody) as { ingredients?: string }
          ingredients = parsed.ingredients
        }
      } catch {
        // ignore raw body parse error
      }
    }

    if (!ingredients?.trim()) {
      sendJson(res, 400, { error: 'ingredients field is required' })
      return
    }

    const rawGroq = (process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY || '').trim()
    const rawOpenRouter = (process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '').trim()
    const rawGemini = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '').trim()
    const rawOpenAi = (process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '').trim()

    const openRouterKey = rawOpenRouter || (rawGroq.startsWith('sk-or-v1-') ? rawGroq : '')
    const groqKey = rawGroq.startsWith('gsk_') ? rawGroq : (openRouterKey ? '' : rawGroq)
    const geminiKey = rawGemini
    const openAiKey = rawOpenAi

    let apiResponseText = ''

    if (openRouterKey) {
      const openRouterModels = [
        'meta-llama/llama-3.3-70b-instruct',
        'google/gemini-2.0-flash-exp:free',
        'qwen/qwen-2.5-72b-instruct:free',
        'deepseek/deepseek-r1:free',
        'meta-llama/llama-3.1-80b-instruct:free',
      ]

      let lastOpenRouterError = ''
      for (const model of openRouterModels) {
        const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
          },
          body: JSON.stringify({
            model,
            response_format: { type: 'json_object' },
            temperature: 0.7,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: `Ingredients available in my fridge/pantry: ${ingredients}` },
            ],
          }),
        })

        if (openRouterRes.ok) {
          const data = (await openRouterRes.json()) as { choices?: Array<{ message?: { content?: string } }> }
          apiResponseText = data.choices?.[0]?.message?.content ?? ''
          if (apiResponseText) break
        } else {
          lastOpenRouterError = await openRouterRes.text().catch(() => openRouterRes.statusText)
        }
      }

      if (!apiResponseText) {
        sendJson(res, 502, { error: `OpenRouter API Error: ${lastOpenRouterError.slice(0, 300)}` })
        return
      }

    } else if (groqKey) {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          response_format: { type: 'json_object' },
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Ingredients available in my fridge/pantry: ${ingredients}` },
          ],
        }),
      })

      if (!groqRes.ok) {
        const errText = await groqRes.text().catch(() => groqRes.statusText)
        sendJson(res, 502, { error: `Groq API Error (${groqRes.status}): ${errText.slice(0, 300)}` })
        return
      }

      const data = (await groqRes.json()) as { choices?: Array<{ message?: { content?: string } }> }
      apiResponseText = data.choices?.[0]?.message?.content ?? ''

    } else if (geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Ingredients: ${ingredients}` }]
          }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      })

      if (!geminiRes.ok) {
        const errText = await geminiRes.text().catch(() => geminiRes.statusText)
        sendJson(res, 502, { error: `Gemini API Error (${geminiRes.status}): ${errText.slice(0, 300)}` })
        return
      }

      const geminiData = (await geminiRes.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
      }
      apiResponseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    } else if (openAiKey) {
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Ingredients available in my fridge/pantry: ${ingredients}` },
          ],
        }),
      })

      if (!openAiRes.ok) {
        const errText = await openAiRes.text().catch(() => openAiRes.statusText)
        sendJson(res, 502, { error: `OpenAI API Error (${openAiRes.status}): ${errText.slice(0, 300)}` })
        return
      }

      const data = (await openAiRes.json()) as { choices?: Array<{ message?: { content?: string } }> }
      apiResponseText = data.choices?.[0]?.message?.content ?? ''

    } else {
      sendJson(res, 400, {
        error: 'API key missing. Please add VITE_GROQ_API_KEY or OPENROUTER_API_KEY to your .env.local file.',
      })
      return
    }

    if (!apiResponseText) {
      sendJson(res, 502, { error: 'The AI model returned an empty response. Please try again.' })
      return
    }

    const cleanJson = apiResponseText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
    const parsed = JSON.parse(cleanJson)
    sendJson(res, 200, parsed)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error'
    sendJson(res, 500, { error: msg })
  }
}
