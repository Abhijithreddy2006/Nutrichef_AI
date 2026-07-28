import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, ArrowRightLeft } from 'lucide-react'
import type { Recipe } from '../lib/schema'

interface SwapsPanelProps {
  swaps: Recipe['swaps']
}

export default function SwapsPanel({ swaps }: SwapsPanelProps) {
  const [expanded, setExpanded] = useState(true)

  if (!swaps || swaps.length === 0) return null

  return (
    <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm overflow-hidden space-y-4">
      {/* ── Header Banner ── */}
      <div className="relative h-24 border-b border-stone-200 dark:border-stone-800">
        <img
          src="/images/spice_ingredient_swaps.png"
          alt="Colorful kitchen spices and herbs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-4 flex items-end justify-between text-white">
          <div>
            <h3 className="font-extrabold text-base flex items-center gap-1.5 leading-tight">
              Smart Swaps <Sparkles size={14} className="text-amber-400" />
            </h3>
            <p className="text-[11px] text-amber-200/90">Chef-approved ingredient alternatives</p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            aria-label={expanded ? 'Collapse swaps' : 'Expand swaps'}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* ── Swaps Callout Cards ── */}
      {expanded && (
        <div className="p-6 pt-0 grid grid-cols-1 gap-3.5">
          {swaps.map((swap, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-amber-200/80 dark:border-amber-900/40 bg-white dark:bg-stone-800 p-4 space-y-2 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  Missing <span className="text-stone-900 dark:text-stone-100 underline decoration-amber-400 font-extrabold">{swap.originalIngredient}</span>?
                </span>
                <span className="font-bold px-2.5 py-1 rounded-full bg-[#E58E26] text-white flex items-center gap-1 shadow-xs text-[11px]">
                  <ArrowRightLeft size={10} /> Use {swap.recommendedSwap}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {swap.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
