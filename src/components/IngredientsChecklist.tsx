import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Recipe } from '../lib/schema'

interface IngredientsChecklistProps {
  recipe: Recipe
  servings: number
}

const CATEGORY_CONFIG: Record<string, { label: string; emoji: string; bg: string }> = {
  protein: { label: 'Protein', emoji: '🥩', bg: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50' },
  vegetable: { label: 'Vegetables', emoji: '🥦', bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50' },
  grain: { label: 'Grains & Starches', emoji: '🌾', bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50' },
  dairy: { label: 'Dairy', emoji: '🧀', bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50' },
  fat: { label: 'Fats & Oils', emoji: '🫙', bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50' },
  seasoning: { label: 'Seasonings', emoji: '🧂', bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50' },
  sauce: { label: 'Sauces & Liquids', emoji: '🫗', bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50' },
  fruit: { label: 'Fruit', emoji: '🍋', bg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-900/50' },
  other: { label: 'Other', emoji: '🍴', bg: 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800' },
}

function formatAmount(amount: number): string {
  const fractions: [number, string][] = [
    [0.25, '¼'], [0.33, '⅓'], [0.5, '½'], [0.67, '⅔'], [0.75, '¾']
  ]
  const whole = Math.floor(amount)
  const dec = amount - whole
  const frac = fractions.find(([v]) => Math.abs(dec - v) < 0.05)
  if (frac) return whole > 0 ? `${whole}${frac[1]}` : frac[1]
  return amount % 1 === 0 ? String(amount) : amount.toFixed(1)
}

export default function IngredientsChecklist({ recipe, servings }: IngredientsChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const scale = servings / recipe.baseServings

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const grouped = recipe.ingredients.reduce<Record<string, typeof recipe.ingredients>>((acc, ing) => {
    const cat = ing.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(ing)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  return (
    <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm p-6 space-y-6">
      {/* Visual Header Banner */}
      <div className="relative rounded-[20px] overflow-hidden h-28 border border-stone-200 dark:border-stone-800">
        <img
          src="/images/fridge_ingredients.png"
          alt="Fresh ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent flex items-end p-4">
          <div className="flex items-center justify-between w-full text-white">
            <div>
              <h2 className="font-extrabold text-base leading-tight">Ingredients List</h2>
              <p className="text-[11px] text-stone-300">Check off items as you prep</p>
            </div>
            <span className="text-[11px] font-mono-recipe font-bold px-3 py-1 rounded-full bg-[#E58E26] text-white shadow-sm">
              {checked.size}/{recipe.ingredients.length} ready
            </span>
          </div>
        </div>
      </div>

      {/* Grouped ingredients with graphical badges */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG.other
          return (
            <div key={cat} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${config.bg} flex items-center gap-1.5 uppercase tracking-wider`}>
                  <span>{config.emoji}</span>
                  <span>{config.label}</span>
                </span>
              </div>
              <ul className="space-y-1.5" role="list">
                {grouped[cat].map((ing) => {
                  const scaledAmount = ing.originalAmount * scale
                  const isChecked = checked.has(ing.id)
                  return (
                    <li key={ing.id}>
                      <label className={`flex items-center gap-3 rounded-2xl p-3 border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-stone-200/60 dark:bg-stone-800/40 border-stone-300 dark:border-stone-800'
                          : 'bg-white dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-[#E58E26]'
                      }`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isChecked
                            ? 'bg-[#E58E26] border-[#E58E26] text-white shadow-xs'
                            : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
                        }`}>
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(ing.id)}
                          className="sr-only"
                        />
                        <span className={`text-xs leading-snug transition-all ${
                          isChecked ? 'line-through text-stone-400 dark:text-stone-500' : 'text-[#1E1E1E] dark:text-stone-100 font-semibold'
                        }`}>
                          <span className="font-mono-recipe font-bold text-[#E58E26]">
                            {formatAmount(scaledAmount)} {ing.unit}
                          </span>{' '}
                          {ing.name}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold text-stone-500 dark:text-stone-400">
          <span>Prep Completion</span>
          <span className="font-mono-recipe">{Math.round((checked.size / recipe.ingredients.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#E58E26] rounded-full transition-all duration-300 shadow-xs"
            style={{ width: `${(checked.size / recipe.ingredients.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
