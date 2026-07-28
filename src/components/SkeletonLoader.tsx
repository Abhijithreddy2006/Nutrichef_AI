export default function SkeletonLoader() {
  return (
    <div className="w-full space-y-8 animate-slide-up" aria-busy="true" aria-label="Generating recipe...">
      {/* Header Card Skeleton */}
      <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm p-6 md:p-8 space-y-6">
        <div className="skeleton h-6 w-40 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-9 w-3/4 rounded-2xl" />
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-5/6 rounded-lg" />
        </div>

        {/* Meta Strip Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800">
          <div className="skeleton h-16 rounded-[22px]" />
          <div className="skeleton h-16 rounded-[22px]" />
          <div className="skeleton h-16 rounded-[22px]" />
        </div>
      </div>

      {/* Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
        {/* Left Column: Ingredients Card Skeleton */}
        <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm p-6 space-y-4">
          <div className="skeleton h-7 w-36 rounded-full" />
          <div className="space-y-3 pt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="skeleton h-5 w-5 rounded-full shrink-0" />
                <div className="skeleton h-4 rounded-lg" style={{ width: `${60 + (i % 3) * 15}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cooking Steps Skeleton */}
        <div className="rounded-[28px] border border-stone-200/70 dark:border-stone-800 bg-[#F6F6F6] dark:bg-stone-900 shadow-sm p-6 md:p-8 space-y-6">
          <div className="skeleton h-7 w-44 rounded-full" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-[22px] border border-stone-200/60 dark:border-stone-800 p-5 space-y-3">
                <div className="flex gap-4 items-start">
                  <div className="skeleton h-9 w-9 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 pt-1">
                    <div className="skeleton h-4 w-full rounded-lg" />
                    <div className="skeleton h-4 w-4/5 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
