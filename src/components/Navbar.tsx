import { Search, Moon, Sun, RotateCcw } from 'lucide-react'
import NutriChefLogo from './NutriChefLogo'

interface NavbarProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
  onOpenSearch: () => void
  onReset: () => void
}

export default function Navbar({
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onReset,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#13261C]/95 backdrop-blur-md border-b border-[#E0EFE0] dark:border-[#1F3B2B] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* NutriChef AI Logo & Brand Header */}
        <div
          onClick={onReset}
          className="cursor-pointer group shrink-0 select-none hover:opacity-95 transition-opacity"
        >
          <NutriChefLogo size="md" />
        </div>

        {/* Center Tagline Pill */}
        <div className="hidden lg:flex items-center gap-2 bg-[#E8F5E9] dark:bg-[#1A3D2A] px-4 py-1.5 rounded-full border border-[#43B02A]/30 dark:border-[#43B02A]/40 text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#43B02A] animate-pulse" />
          <span>AI Recipes &bull; Real Flavor &bull; Made for You</span>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Reset button */}
          <button
            onClick={onReset}
            className="text-xs font-extrabold px-4 py-2 rounded-full bg-[#43B02A] text-white hover:bg-[#2E7D32] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Start new recipe search"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">New Recipe</span>
          </button>

          {/* Search Bar Button */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center justify-between gap-3 bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] px-4 py-2 rounded-full text-xs text-[#1E1E1E] dark:text-white w-48 sm:w-56 shadow-2xs hover:border-[#43B02A] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search size={14} className="text-[#43B02A] shrink-0" />
              <span className="truncate font-semibold">Search ingredients...</span>
            </div>
            <kbd className="text-[10px] font-mono font-bold bg-white dark:bg-[#13261C] px-1.5 py-0.5 rounded text-stone-500 border border-stone-200 dark:border-stone-700 shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Mode Switcher Toggle Pill */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full bg-[#F4FBF4] dark:bg-[#0B1912] border border-[#E0EFE0] dark:border-[#1F3B2B] text-[#2E7D32] dark:text-white flex items-center justify-center hover:border-[#43B02A] transition-colors cursor-pointer shadow-2xs"
          >
            {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-[#2E7D32]" />}
          </button>
        </div>
      </div>
    </header>
  )
}
