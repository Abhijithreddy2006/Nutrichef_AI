import { useState } from 'react'
import { UtensilsCrossed, CheckCircle2, Lightbulb, PartyPopper, Flame, Sparkles } from 'lucide-react'
import type { Recipe } from '../lib/schema'

interface CookingStepsProps {
  instructions: Recipe['instructions']
}

function getStepImage(stepIndex: number, totalSteps: number): string {
  if (stepIndex === 0 || stepIndex === 1) return '/images/step_prep_chop.png'
  if (stepIndex === totalSteps - 1) return '/images/step_plated_dish.png'
  return '/images/step_cook_pan.png'
}

function getStepPhase(stepIndex: number, totalSteps: number): string {
  if (stepIndex === 0 || stepIndex === 1) return 'Prep & Chop Phase'
  if (stepIndex === totalSteps - 1) return 'Plate & Serve'
  return 'Cooking & Sauté Phase'
}

export default function CookingSteps({ instructions }: CookingStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  function toggleStep(stepNumber: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      next.has(stepNumber) ? next.delete(stepNumber) : next.add(stepNumber)
      return next
    })
  }

  const total = instructions.length
  const isAllComplete = completedSteps.size === total

  return (
    <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Visual Cooking Banner Header */}
      <div className="relative rounded-[22px] overflow-hidden min-h-[130px] border border-stone-200 dark:border-stone-800">
        <img
          src="/images/recipe_cooking_steps.png"
          alt="Cooking process action visual"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-transparent p-6 flex flex-col justify-between text-white z-10">
          <div className="flex justify-between items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-300">
              <UtensilsCrossed size={13} /> Guided Cooking Timeline
            </div>
            <span className="text-xs font-mono-recipe font-bold px-3 py-1 rounded-full bg-[#E58E26] text-white shadow-sm">
              {completedSteps.size} / {total} done
            </span>
          </div>

          <div>
            <h2 className="font-extrabold text-xl sm:text-2xl leading-tight">Step-by-Step Directions</h2>
            <p className="text-xs text-stone-300">Follow each graphic step and check off as you finish</p>
          </div>
        </div>
      </div>

      {/* ── Graphic Step Timeline List ── */}
      <div className="space-y-4">
        {instructions.map((step, idx) => {
          const isDone = completedSteps.has(step.stepNumber)
          const stepImg = getStepImage(idx, total)
          const phase = getStepPhase(idx, total)

          return (
            <div
              key={step.stepNumber}
              onClick={() => toggleStep(step.stepNumber)}
              className={`group relative rounded-[22px] border p-5 transition-all cursor-pointer select-none space-y-3 ${
                isDone
                  ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/80 shadow-none'
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-[#E58E26] shadow-xs hover:shadow-sm'
              }`}
            >
              <div className="flex gap-4 items-start">
                {/* Step Thumbnail Image */}
                <div className="hidden sm:block w-20 h-20 rounded-[16px] overflow-hidden shrink-0 border border-stone-200 dark:border-stone-700 shadow-xs">
                  <img
                    src={stepImg}
                    alt={phase}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E58E26] flex items-center gap-1">
                      <Flame size={12} /> {phase}
                    </span>

                    {/* Step Number / Completed Check Badge */}
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                        isDone
                          ? 'bg-amber-500 text-white'
                          : 'bg-[#1E1E1E] text-white group-hover:bg-black'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 size={13} /> Step {step.stepNumber} Done
                        </>
                      ) : (
                        <>Step {step.stepNumber}</>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed transition-all ${
                      isDone
                        ? 'line-through text-stone-400 dark:text-stone-500 font-normal'
                        : 'text-stone-800 dark:text-stone-100 font-semibold'
                    }`}
                  >
                    {step.text}
                  </p>

                  {/* Chef Tip Graphic Callout Box */}
                  {step.tip && !isDone && (
                    <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/80 dark:bg-amber-950/30 p-3 text-xs text-amber-900 dark:text-amber-200 mt-2">
                      <Lightbulb size={15} className="text-[#E58E26] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] text-[#E58E26] block mb-0.5 flex items-center gap-1">
                          <Sparkles size={10} /> Pro Chef Tip
                        </span>
                        <span>{step.tip}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completion Visual Card */}
      {isAllComplete && (
        <div className="rounded-[22px] border border-amber-300 dark:border-amber-800 bg-gradient-to-r from-amber-600 to-[#E58E26] text-white p-6 flex flex-col sm:flex-row items-center gap-5 shadow-lg animate-slide-up">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-sm">
            <img
              src="/images/step_plated_dish.png"
              alt="Plated gourmet meal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-extrabold text-lg flex items-center justify-center sm:justify-start gap-2">
              <PartyPopper size={18} className="text-amber-200" /> Bon Appétit! FLAVORIZ Recipe Complete
            </h4>
            <p className="text-xs text-amber-100 mt-1">
              All cooking steps are checked off. Enjoy your freshly prepared homemade dish!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
