import { Flame, Zap } from 'lucide-react'

interface SidebarProps {
  onQuickPrompt: (prompt: string) => void
  savedCount: number
}

const QUICK_PROMPTS = [
  { name: 'Chicken, Garlic, Lemon, Rice', icon: '🍗' },
  { name: 'Eggs, Spinach, Cheese, Tomatoes', icon: '🍳' },
  { name: 'Shrimp, Pasta, Butter, Olive Oil', icon: '🦐' },
  { name: 'Paneer, Bell Peppers, Onion, Rice', icon: '🍛' },
  { name: 'Salmon, Soy Sauce, Honey, Broccoli', icon: '🐟' },
]

export default function Sidebar({ onQuickPrompt, savedCount: _savedCount }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-5 w-64 shrink-0 z-30 sticky top-24">
      {/* Main Left Card (Clean Contrast in Light & Dark Mode) */}
      <div className="bg-white dark:bg-[#13261C] rounded-[24px] p-5 border border-[#E0EFE0] dark:border-[#1F3B2B] space-y-5 shadow-2xs">
        
        {/* 1. Profile Header Box */}
        <div className="text-center space-y-2 border-b border-[#E0EFE0] dark:border-[#1F3B2B] pb-4">
          <div className="relative inline-block">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="NutriChef avatar"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#43B02A] shadow-xs mx-auto"
            />
            <span className="absolute -bottom-1 -right-1 text-sm">👨‍🍳</span>
          </div>

          <div>
            <h3 className="font-extrabold text-sm text-[#1E1E1E] dark:text-white">
              Hello, Chef! 👋
            </h3>
            <p className="text-[11px] text-[#757576] dark:text-stone-400">
              NutriChef AI is ready to cook!
            </p>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#E8F5E9] dark:bg-[#1A3D2A] text-[#2E7D32] dark:text-[#8BC34A] border border-[#43B02A]/30 inline-block shadow-2xs">
              🌿 NutriChef AI Active
            </span>
          </div>
        </div>

        {/* 2. QUICK PROMPTS Section */}
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#757576] dark:text-stone-400 flex items-center gap-1">
            <Zap size={12} className="text-[#FF8C42]" /> POPULAR PANTRY COMBOS
          </p>

          <div className="space-y-1.5">
            {QUICK_PROMPTS.map((item) => (
              <button
                key={item.name}
                onClick={() => onQuickPrompt(item.name)}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A] hover:bg-[#E8F5E9] dark:hover:bg-[#1A3D2A] transition-all cursor-pointer shadow-2xs group text-left"
              >
                <div className="flex items-center gap-2 truncate">
                  <span>{item.icon}</span>
                  <span className="text-xs font-bold text-[#1E1E1E] dark:text-white truncate">
                    {item.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. NUTRITION PROGRESS (Exact Copy from Design Sheet) */}
        <div className="space-y-3 pt-2 border-t border-[#E0EFE0] dark:border-[#1F3B2B]">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#757576] dark:text-stone-400">
            NUTRITION PROGRESS
          </p>

          <div className="flex items-center gap-4">
            {/* Green Doughnut Chart with 78% matching Sheet */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E0EFE0"
                  strokeWidth="3.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#43B02A"
                  strokeWidth="3.5"
                  strokeDasharray="78, 100"
                />
              </svg>
              <span className="absolute font-extrabold text-xs text-[#2E7D32] dark:text-[#8BC34A]">
                78%
              </span>
            </div>

            <div className="space-y-0.5 text-[11px] font-semibold text-[#1E1E1E] dark:text-stone-200">
              <p className="font-extrabold text-[#1E1E1E] dark:text-white">1,850 / 2,300 kcal</p>
              <p className="text-[#43B02A] font-bold">112g Protein &bull; 85g Fat</p>
              <p className="text-[#757576] dark:text-stone-400 font-bold">200g Carbs</p>
            </div>
          </div>
        </div>

        {/* 4. Brand Tagline Pill */}
        <div className="rounded-2xl bg-[#E8F5E9] dark:bg-[#1A3D2A] p-3 text-center border border-[#43B02A]/30 space-y-1">
          <p className="font-extrabold text-[11px] text-[#2E7D32] dark:text-[#8BC34A] flex items-center justify-center gap-1">
            <Flame size={14} className="fill-[#FF8C42] text-[#FF8C42]" /> 7 Day Cooking Streak <Flame size={14} className="fill-[#FF8C42] text-[#FF8C42]" />
          </p>
          <p className="text-[10px] text-[#757576] dark:text-stone-400">
            Clean &bull; Fresh &bull; Healthy &bull; Intelligent
          </p>
        </div>

      </div>
    </aside>
  )
}
