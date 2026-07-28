import { Clock, Flame, Users, Minus, Plus, Camera, Utensils } from 'lucide-react'
import type { Recipe } from '../lib/schema'
import { getRecipeImage } from '../lib/imageHelper'

interface RecipeHeaderProps {
  recipe: Recipe
  servings: number
  onServingsChange: (n: number) => void
}

export default function RecipeHeader({ recipe, servings, onServingsChange }: RecipeHeaderProps) {
  const scale = servings / recipe.baseServings
  const ingredientsStr = recipe.ingredients.map((i) => i.name).join(' ')
  const headerImg = getRecipeImage(recipe.title, ingredientsStr)

  return (
    <div className="space-y-6 animate-slide-up">
      {/* ── Figma Hero Recipe Card with Dynamic AI Photography ── */}
      <div className="relative w-full rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl border border-stone-800 bg-stone-950 min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-10">
        <img
          src={headerImg}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        {/* AI Photography Badge */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium">
          <Camera size={13} />
          High-Res Dish Photography
        </div>

        {/* Hero Title & Description */}
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E58E26]/20 backdrop-blur-md border border-[#E58E26]/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Utensils size={13} /> Custom Recipe Generated
          </div>
          <h1 className="font-extrabold text-3xl sm:text-5xl text-white leading-tight drop-shadow-md">
            {recipe.title}
          </h1>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed drop-shadow">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* ── Servings & Meta Card Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Prep Time Card */}
        <div className="rounded-[22px] border border-stone-200/80 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-800/60 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#E58E26] flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900/50">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Prep Time</p>
            <p className="text-base font-extrabold text-[#1E1E1E] dark:text-stone-100 font-mono-recipe">{recipe.prepTime}</p>
          </div>
        </div>

        {/* Cook Time Card */}
        <div className="rounded-[22px] border border-stone-200/80 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-800/60 p-4 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-900/50">
            <Flame size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Cook Time</p>
            <p className="text-base font-extrabold text-[#1E1E1E] dark:text-stone-100 font-mono-recipe">{recipe.cookTime}</p>
          </div>
        </div>

        {/* Interactive Servings Scaler Card */}
        <div className="rounded-[22px] border border-stone-200/80 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-800/60 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-50 dark:bg-amber-950/60 text-[#E58E26] flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900/50">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Servings</p>
              {scale !== 1 && (
                <span className="text-[11px] font-bold text-[#E58E26]">
                  {scale % 1 === 0 ? scale : scale.toFixed(1)}× scale
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onServingsChange(Math.max(1, servings - 1))}
              aria-label="Decrease servings"
              className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="font-mono-recipe font-extrabold text-lg text-[#1E1E1E] dark:text-stone-100 w-6 text-center">
              {servings}
            </span>
            <button
              onClick={() => onServingsChange(Math.min(20, servings + 1))}
              aria-label="Increase servings"
              className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
