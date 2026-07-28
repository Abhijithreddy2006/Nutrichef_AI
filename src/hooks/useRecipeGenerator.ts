import { useRef, useState, useCallback } from 'react'
import { RecipeSchema, type Recipe } from '../lib/schema'

type IdleState = { status: 'idle' }
type LoadingState = { status: 'loading' }
type ErrorState = { status: 'error'; message: string }
type SuccessState = { status: 'success'; data: Recipe }

export type RecipeState = IdleState | LoadingState | ErrorState | SuccessState

export function useRecipeGenerator() {
  const [state, setState] = useState<RecipeState>({ status: 'idle' })
  const abortControllerRef = useRef<AbortController | null>(null)

  const generate = useCallback(async (ingredients: string) => {
    // 1. Drop stale requests if the user clicks "Generate" multiple times
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    setState({ status: 'loading' })

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMsg =
          errorData.error ||
          `API Request failed with status ${response.status}. Please check your API key setup.`
        throw new Error(errorMsg)
      }

      const rawData = await response.json()

      // 2. Validate response with Zod JSON schema
      const parseResult = RecipeSchema.safeParse(rawData)
      if (!parseResult.success) {
        const issue = parseResult.error.issues[0]
        const path = issue?.path?.join('.') || 'recipe structure'
        throw new Error(
          `Unexpected recipe format at "${path}": ${issue?.message || 'invalid response'}. Please retry.`
        )
      }

      setState({ status: 'success', data: parseResult.data })
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Aborted request dropped silently
        return
      }
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'An unexpected error occurred.',
      })
    }
  }, [])

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setState({ status: 'idle' })
  }, [])

  return { state, generate, reset }
}
