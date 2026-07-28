import { useState } from 'react'
import {
  ArrowLeft,
  Printer,
  Bookmark,
  Sparkles,
  Play,
  Check,
  Lightbulb,
  ArrowRightLeft,
  X,
  ChevronRight,
  Flame,
  Clock,
  Users,
} from 'lucide-react'
import type { Recipe } from '../lib/schema'
import { getRecipeImage, getUniqueStepImages } from '../lib/imageHelper'

interface RecipeDetailProps {
  recipe: Recipe
  onReset: () => void
  onRegenerateWithVariant: (variant: string) => void
}

const AI_VARIANTS = [
  { label: '🥗 Healthy Version', value: 'make it extra healthy and low calorie' },
  { label: '🥩 High Protein', value: 'maximize protein content' },
  { label: '🥑 Low Carb', value: 'make it keto low carb' },
  { label: '💰 Budget Friendly', value: 'use low cost budget staples' },
  { label: '👶 Kid Friendly', value: 'make it mild and kid friendly' },
  { label: '🌱 Vegan', value: 'make it 100% plant based vegan' },
  { label: '🌾 Gluten Free', value: 'make it strictly gluten free' },
  { label: '💪 Muscle Gain', value: 'high calorie high protein muscle builder' },
]

export default function RecipeDetail({ recipe, onReset, onRegenerateWithVariant }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.baseServings)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set())
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isSaved, setIsSaved] = useState(false)
  const [isCookingMode, setIsCookingMode] = useState(false)
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const scale = servings / recipe.baseServings
  const ingredientsStr = recipe.ingredients.map((i) => i.name).join(' ')
  const heroImg = getRecipeImage(recipe.title, ingredientsStr)
  const stepImages = getUniqueStepImages(recipe.instructions.length)

  function toggleIngredient(id: string) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleStep(stepNumber: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      next.has(stepNumber) ? next.delete(stepNumber) : next.add(stepNumber)
      return next
    })
  }

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#13261C] border border-[#E0EFE0] dark:border-[#1F3B2B] text-xs font-bold text-[#1E1E1E] dark:text-white hover:border-[#43B02A] transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft size={16} className="text-[#43B02A]" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCookingMode(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#43B02A] text-white text-xs font-extrabold hover:bg-[#2E7D32] transition-all shadow-md cursor-pointer"
          >
            <Play size={14} className="fill-white" />
            <span>Start Cooking Mode</span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-2xs ${
              isSaved
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white dark:bg-[#13261C] text-[#1E1E1E] dark:text-white border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A]'
            }`}
          >
            <Bookmark size={16} className={isSaved ? 'fill-white' : ''} />
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-full bg-white dark:bg-[#13261C] text-[#1E1E1E] dark:text-white border border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A] transition-all shadow-2xs cursor-pointer"
            title="Print recipe"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Main Recipe Header Hero Card */}
      <div className="bg-white dark:bg-[#13261C] rounded-[28px] p-6 sm:p-8 border border-[#E0EFE0] dark:border-[#1F3B2B] shadow-2xs space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E8F5E9] dark:bg-[#1A3D2A] text-[#2E7D32] dark:text-[#8BC34A] text-[11px] font-extrabold border border-[#43B02A]/30">
                🌿 NutriChef AI Verified Recipe
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[11px] font-extrabold border border-amber-200">
                ★ 4.9 (128 reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#1E1E1E] dark:text-white tracking-tight leading-tight">
              {recipe.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#757576] dark:text-stone-300 leading-relaxed font-medium">
              {recipe.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] text-center space-y-0.5">
                <Clock size={16} className="text-[#43B02A] mx-auto" />
                <p className="text-[10px] text-[#757576] dark:text-stone-400 font-bold uppercase">Prep Time</p>
                <p className="text-xs font-extrabold text-[#1E1E1E] dark:text-white">{recipe.prepTime}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] text-center space-y-0.5">
                <Flame size={16} className="text-[#FF8C42] mx-auto" />
                <p className="text-[10px] text-[#757576] dark:text-stone-400 font-bold uppercase">Cook Time</p>
                <p className="text-xs font-extrabold text-[#1E1E1E] dark:text-white">{recipe.cookTime}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] text-center space-y-0.5">
                <Users size={16} className="text-[#43B02A] mx-auto" />
                <p className="text-[10px] text-[#757576] dark:text-stone-400 font-bold uppercase">Servings</p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-5 h-5 rounded bg-white dark:bg-[#13261C] border text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold text-[#1E1E1E] dark:text-white">{servings}</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-5 h-5 rounded bg-white dark:bg-[#13261C] border text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full h-64 sm:h-80 rounded-[24px] overflow-hidden relative border-4 border-[#F4FBF4] dark:border-[#0B1912] shadow-md">
              <img src={heroImg} alt={recipe.title} className="w-full h-full object-cover" />
              <span className="absolute bottom-3 right-3 text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#2E7D32]/90 text-white backdrop-blur-md">
                Gourmet AI Plate
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2 Column Layout: Ingredients Checklist Left + Instructions & Swaps Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Ingredients Checklist */}
        <div className="lg:col-span-5 bg-white dark:bg-[#13261C] rounded-[28px] p-6 border border-[#E0EFE0] dark:border-[#1F3B2B] space-y-5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E0EFE0] dark:border-[#1F3B2B] pb-3">
            <h3 className="font-extrabold text-base text-[#1E1E1E] dark:text-white uppercase tracking-wider">
              Ingredients ({recipe.ingredients.length})
            </h3>
            <span className="text-[11px] font-bold text-[#43B02A]">
              Scaled x{scale.toFixed(1)}
            </span>
          </div>

          <div className="space-y-2">
            {recipe.ingredients.map((ing) => {
              const isChecked = checkedIngredients.has(ing.id)
              const scaledAmount = (ing.originalAmount * scale).toFixed(ing.originalAmount * scale % 1 === 0 ? 0 : 1)

              return (
                <div
                  key={ing.id}
                  onClick={() => toggleIngredient(ing.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                    isChecked
                      ? 'bg-[#E8F5E9] dark:bg-[#1A3D2A] border-[#43B02A] text-stone-400 line-through'
                      : 'bg-[#F4FBF4] dark:bg-[#0B1912] border-[#E0EFE0] dark:border-[#1F3B2B] text-[#1E1E1E] dark:text-white hover:border-[#43B02A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-[#43B02A] border-[#43B02A] text-white'
                          : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800'
                      }`}
                    >
                      {isChecked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className="text-xs font-bold capitalize">{ing.name}</span>
                  </div>

                  <span className="text-xs font-extrabold text-[#43B02A]">
                    {scaledAmount} {ing.unit}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Smart Substitutions Panel */}
          {recipe.swaps && recipe.swaps.length > 0 && (
            <div className="pt-4 border-t border-[#E0EFE0] dark:border-[#1F3B2B] space-y-3">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF8C42] flex items-center gap-1">
                <ArrowRightLeft size={12} /> SMART AI INGREDIENT SWAPS
              </p>
              <div className="space-y-2">
                {recipe.swaps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#FFF3E0] dark:bg-[#3E2723]/60 border border-[#FF8C42]/30 text-xs space-y-1">
                    <p className="font-bold text-[#1E1E1E] dark:text-white">
                      Swap <span className="text-[#FF8C42]">{s.originalIngredient}</span> &rarr; <span className="text-[#43B02A]">{s.recommendedSwap}</span>
                    </p>
                    <p className="text-[11px] text-[#757576] dark:text-stone-300">{s.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Cooking Instructions */}
        <div className="lg:col-span-7 bg-white dark:bg-[#13261C] rounded-[28px] p-6 border border-[#E0EFE0] dark:border-[#1F3B2B] space-y-6 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E0EFE0] dark:border-[#1F3B2B] pb-3">
            <h3 className="font-extrabold text-base text-[#1E1E1E] dark:text-white uppercase tracking-wider">
              Step-by-Step Instructions ({recipe.instructions.length})
            </h3>
            <span className="text-[11px] font-bold text-[#43B02A]">
              {completedSteps.size}/{recipe.instructions.length} Done
            </span>
          </div>

          <div className="space-y-5">
            {recipe.instructions.map((step, idx) => {
              const isCompleted = completedSteps.has(step.stepNumber)
              const stepImg = stepImages[idx % stepImages.length]

              return (
                <div
                  key={step.stepNumber}
                  className={`p-4 sm:p-5 rounded-[22px] border transition-all ${
                    isCompleted
                      ? 'bg-[#E8F5E9]/60 dark:bg-[#1A3D2A]/60 border-[#43B02A]/40 opacity-75'
                      : 'bg-[#F4FBF4] dark:bg-[#0B1912] border-[#E0EFE0] dark:border-[#1F3B2B]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3.5">
                      <button
                        onClick={() => toggleStep(step.stepNumber)}
                        className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 font-extrabold text-xs cursor-pointer transition-colors ${
                          isCompleted
                            ? 'bg-[#43B02A] border-[#43B02A] text-white'
                            : 'bg-white dark:bg-[#13261C] border-[#43B02A] text-[#43B02A]'
                        }`}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : step.stepNumber}
                      </button>

                      <div className="space-y-2">
                        <p className={`text-xs sm:text-sm font-semibold text-[#1E1E1E] dark:text-white leading-relaxed ${isCompleted ? 'line-through' : ''}`}>
                          {step.text}
                        </p>

                        {step.tip && (
                          <div className="flex items-start gap-1.5 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-[11px] text-amber-800 dark:text-amber-300 font-medium">
                            <Lightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
                            <span><strong>Chef Tip:</strong> {step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step Thumbnail */}
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E0EFE0] dark:border-stone-700 hidden sm:block">
                      <img src={stepImg} alt={`Step ${step.stepNumber}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 1-Click AI Variants Panel */}
          <div className="pt-4 border-t border-[#E0EFE0] dark:border-[#1F3B2B] space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#43B02A] flex items-center gap-1">
              <Sparkles size={13} /> 1-CLICK AI FLAVOR VARIATIONS
            </p>
            <div className="flex flex-wrap gap-2">
              {AI_VARIANTS.map((v) => (
                <button
                  key={v.label}
                  onClick={() => onRegenerateWithVariant(`${recipe.ingredients.map(i => i.name).join(', ')}, ${v.value}`)}
                  className="text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] text-[#1E1E1E] dark:text-white hover:border-[#43B02A] hover:text-[#43B02A] transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Interactive Cooking Mode Modal */}
      {isCookingMode && (
        <div className="fixed inset-0 z-50 bg-[#0B1912]/95 backdrop-blur-xl flex flex-col justify-between p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#43B02A] text-white font-black text-xs">
                COOKING MODE
              </span>
              <span className="text-xs text-stone-400 font-bold truncate max-w-xs">{recipe.title}</span>
            </div>
            <button
              onClick={() => setIsCookingMode(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Step Focus Content */}
          <div className="max-w-2xl mx-auto w-full text-center space-y-6">
            <span className="text-xs font-extrabold text-[#43B02A] uppercase tracking-widest">
              Step {activeStepIndex + 1} of {recipe.instructions.length}
            </span>

            <h2 className="text-xl sm:text-3xl font-black leading-relaxed">
              {recipe.instructions[activeStepIndex]?.text}
            </h2>

            {recipe.instructions[activeStepIndex]?.tip && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold inline-block">
                💡 <strong>Chef Tip:</strong> {recipe.instructions[activeStepIndex].tip}
              </div>
            )}
          </div>

          {/* Navigation Bottom Controls */}
          <div className="flex items-center justify-between max-w-md mx-auto w-full gap-4">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
              className="px-6 py-3 rounded-full bg-white/10 text-xs font-bold disabled:opacity-30 cursor-pointer"
            >
              Previous Step
            </button>

            <button
              onClick={() => {
                if (activeStepIndex < recipe.instructions.length - 1) {
                  setActiveStepIndex(activeStepIndex + 1)
                } else {
                  setIsCookingMode(false)
                }
              }}
              className="px-8 py-3 rounded-full bg-[#43B02A] text-white text-xs font-extrabold hover:bg-[#2E7D32] cursor-pointer shadow-lg flex items-center gap-1.5"
            >
              <span>{activeStepIndex === recipe.instructions.length - 1 ? 'Finish Cooking 🎉' : 'Next Step'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
