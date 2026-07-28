// ── NutriChef AI Student Web App Project ──
// Main application layout component combining navbar, sidebar, and recipe views

import { useState, useEffect } from 'react'
import { useRecipeGenerator } from './hooks/useRecipeGenerator'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import IngredientInput from './components/IngredientInput'
import AiLoadingState from './components/AiLoadingState'
import RecipeDetail from './components/RecipeDetail'
import ErrorBanner from './components/ErrorBanner'
import { Search, X, Sparkles } from 'lucide-react'

export default function App() {
  const { state, generate, reset } = useRecipeGenerator()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  // Sync dark class to root document element for 100% clean Tailwind dark variant support
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  function handleToggleDarkMode() {
    setIsDarkMode((prev) => !prev)
  }

  function handleRegenerateWithVariant(variantPrompt: string) {
    generate(variantPrompt)
  }

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${isDarkMode ? 'dark bg-[#0B1912] text-white' : 'bg-[#F4FBF4] text-[#1E1E1E]'}`}>
      
      {/* Sticky Glass Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSearch={() => setSearchModalOpen(true)}
        onReset={reset}
      />

      {/* Main Layout Container: Left Sidebar + Center Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-start gap-6">
        {/* Left Profile Sidebar */}
        <Sidebar onQuickPrompt={(prompt) => generate(prompt)} savedCount={12} />

        {/* Center Main Content View Area */}
        <main className="flex-1 w-full min-w-0">
          {state.status === 'idle' && (
            <IngredientInput onSubmit={generate} isLoading={false} />
          )}

          {state.status === 'loading' && <AiLoadingState />}

          {state.status === 'error' && (
            <div className="max-w-3xl mx-auto space-y-8 py-8">
              <ErrorBanner message={state.message} onRetry={reset} />
              <IngredientInput onSubmit={generate} isLoading={false} />
            </div>
          )}

          {state.status === 'success' && (
            <RecipeDetail
              recipe={state.data}
              onReset={reset}
              onRegenerateWithVariant={handleRegenerateWithVariant}
            />
          )}
        </main>
      </div>

      {/* ⌘K Command Palette Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 p-4">
          <div className="bg-white dark:bg-[#13261C] rounded-[28px] max-w-xl w-full p-4 shadow-2xl border border-[#E0EFE0] dark:border-[#1F3B2B] space-y-3 relative animate-slide-up">
            <div className="flex items-center gap-3 px-3 py-2 border-b border-[#E0EFE0] dark:border-[#1F3B2B]">
              <Search size={18} className="text-[#43B02A]" />
              <input
                type="text"
                autoFocus
                placeholder="Search recipes e.g. Garlic Butter Shrimp Pasta..."
                className="w-full text-xs bg-transparent text-[#1E1E1E] dark:text-white placeholder-stone-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 text-stone-400 hover:text-[#1E1E1E] dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-2 space-y-1">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#43B02A] px-3">
                Quick Search Commands
              </p>
              <button
                onClick={() => {
                  generate('garlic butter shrimp pasta')
                  setSearchModalOpen(false)
                }}
                className="w-full text-left text-xs font-bold p-3 rounded-2xl hover:bg-[#E8F5E9] dark:hover:bg-[#1A3D2A] text-[#1E1E1E] dark:text-white flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#43B02A]" /> Garlic Butter Shrimp Pasta
                </span>
                <span className="text-[10px] text-[#43B02A]">Generate</span>
              </button>

              <button
                onClick={() => {
                  generate('honey garlic salmon with lemon')
                  setSearchModalOpen(false)
                }}
                className="w-full text-left text-xs font-bold p-3 rounded-2xl hover:bg-[#E8F5E9] dark:hover:bg-[#1A3D2A] text-[#1E1E1E] dark:text-white flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#43B02A]" /> Honey Garlic Salmon
                </span>
                <span className="text-[10px] text-[#43B02A]">Generate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
