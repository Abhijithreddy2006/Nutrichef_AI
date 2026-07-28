import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const LOADING_STEPS = [
  'Analyzing available fridge ingredients...',
  'Understanding flavor chemistry & healthy pairings...',
  'Balancing macronutrients & caloric scaling...',
  'Generating step-by-step cooking instructions...',
  'Finalizing NutriChef AI recipe cards...',
]

export default function AiLoadingState() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto py-16 flex flex-col items-center justify-center space-y-8 animate-slide-up text-center">
      {/* ── Orbital NutriChef Animation ── */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Glowing Green Background Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-[#43B02A]/20 blur-3xl animate-pulse" />
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#43B02A]/40 animate-spin duration-10000" />

        {/* Central NutriChef Icon */}
        <div className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#43B02A] via-[#8BC34A] to-[#FF8C42] p-0.5 shadow-2xl shadow-[#43B02A]/30">
          <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#13261C] flex items-center justify-center text-white">
            <span className="text-4xl">👨‍🍳</span>
          </div>
        </div>

        {/* Orbiting Cooking Emotes */}
        <div className="absolute inset-0 animate-orbit-1 pointer-events-none">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl shadow-lg p-1.5 rounded-full bg-white/90 dark:bg-[#13261C]/90 backdrop-blur-md">
            🥦
          </span>
        </div>

        <div className="absolute inset-0 animate-orbit-2 pointer-events-none">
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-2xl shadow-lg p-1.5 rounded-full bg-white/90 dark:bg-[#13261C]/90 backdrop-blur-md">
            🍅
          </span>
          <span className="absolute top-1/2 -left-3 -translate-y-1/2 text-2xl shadow-lg p-1.5 rounded-full bg-white/90 dark:bg-[#13261C]/90 backdrop-blur-md">
            🥑
          </span>
          <span className="absolute top-1/2 -right-3 -translate-y-1/2 text-2xl shadow-lg p-1.5 rounded-full bg-white/90 dark:bg-[#13261C]/90 backdrop-blur-md">
            🍗
          </span>
        </div>
      </div>

      {/* ── Dynamic Progress Text & Bar ── */}
      <div className="space-y-3 max-w-sm mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] dark:bg-[#1A3D2A] border border-[#43B02A]/30 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-extrabold uppercase tracking-wider">
          <Sparkles size={14} className="text-[#FF8C42] animate-spin" /> NutriChef AI Neural Net Active
        </div>

        <h3 className="font-extrabold text-xl text-[#1E1E1E] dark:text-white transition-all">
          {LOADING_STEPS[currentStepIndex]}
        </h3>

        {/* Progress Fill Bar */}
        <div className="h-2.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5 border border-[#43B02A]/20">
          <div
            className="h-full bg-gradient-to-r from-[#43B02A] via-[#8BC34A] to-[#FF8C42] rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${((currentStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
