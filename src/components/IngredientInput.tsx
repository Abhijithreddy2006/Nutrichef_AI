import { useState, type FormEvent } from 'react'
import {
  Sparkles,
  Mic,
  Camera,
  Upload,
  Star,
  Clock,
  Flame,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Brain,
  Leaf,
  HeartHandshake,
  Check,
} from 'lucide-react'

interface IngredientInputProps {
  onSubmit: (ingredients: string) => void
  isLoading: boolean
}

const FEATURE_BADGES = [
  { icon: Brain, label: 'AI Powered Smart Recipes', color: 'text-[#43B02A] dark:text-[#8BC34A] bg-[#E8F5E9] dark:bg-[#1A3D2A] border-[#43B02A]/30' },
  { icon: Leaf, label: 'Healthy & Balanced', color: 'text-[#2E7D32] dark:text-[#8BC34A] bg-[#E8F5E9] dark:bg-[#1A3D2A] border-[#43B02A]/30' },
  { icon: Clock, label: 'Quick & Easy', color: 'text-[#FF8C42] bg-[#FFF3E0] dark:bg-[#3E2723] border-[#FF8C42]/30' },
  { icon: HeartHandshake, label: 'Made for You', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200' },
]

const POPULAR_INGREDIENTS = [
  { label: 'Chicken', icon: '🍗', value: 'chicken breast' },
  { label: 'Tomato', icon: '🍅', value: '2 tomatoes' },
  { label: 'Garlic', icon: '🧄', value: '3 cloves garlic' },
  { label: 'Egg', icon: '🥚', value: '3 eggs' },
  { label: 'Cheese', icon: '🧀', value: 'cheddar cheese' },
  { label: 'Broccoli', icon: '🥦', value: 'fresh broccoli' },
  { label: 'Chili', icon: '🌶️', value: 'chili flakes' },
  { label: 'More', icon: '•••', value: 'shrimp, brown rice, garlic, snow peas, soy sauce' },
]

const AI_RECOMMENDED_CARDS = [
  {
    id: 'rec_1',
    title: 'Garlic Butter Shrimp Pasta',
    rating: 4.8,
    time: '20 mins',
    calories: '520 kcal',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1621996346565-e3def616403c?auto=format&fit=crop&w=600&q=80',
    ingredients: 'garlic, heavy cream, fettuccine pasta, parmesan, olive oil, parsley',
  },
  {
    id: 'rec_2',
    title: 'Honey Garlic Salmon',
    rating: 4.8,
    time: '25 mins',
    calories: '450 kcal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    ingredients: 'salmon fillet, honey, garlic, soy sauce, lemon, broccoli',
  },
  {
    id: 'rec_3',
    title: 'Paneer Butter Masala',
    rating: 4.9,
    time: '30 mins',
    calories: '580 kcal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    ingredients: 'paneer cheese, tomato puree, butter, heavy cream, garam masala, garlic',
  },
  {
    id: 'rec_4',
    title: 'Avocado Smash Toast',
    rating: 4.7,
    time: '10 mins',
    calories: '310 kcal',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    ingredients: 'ripe avocado, poached eggs, sourdough bread, red chili flakes, lemon',
  },
  {
    id: 'rec_5',
    title: 'Quinoa Veg Bowl',
    rating: 4.6,
    time: '25 mins',
    calories: '430 kcal',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    ingredients: 'quinoa, chickpeas, broccoli, roasted sweet potato, tahini, kale',
  },
  {
    id: 'rec_6',
    title: 'Chocolate Lava Cake',
    rating: 4.8,
    time: '35 mins',
    calories: '650 kcal',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    ingredients: 'dark chocolate, butter, eggs, sugar, flour, vanilla extract',
  },
]

const CATEGORY_TILES = [
  {
    title: 'Quick & Easy',
    subtitle: '20 min meals',
    icon: '⚡',
    bg: 'bg-[#FFF3E0] dark:bg-[#3E2723]/60 border-[#FF8C42]/30',
    image: 'https://images.unsplash.com/photo-1621996346565-e3def616403c?auto=format&fit=crop&w=200&q=80',
    ingredients: 'eggs, spinach, garlic, tomatoes, olive oil',
  },
  {
    title: 'High Protein',
    subtitle: 'Muscle Building',
    icon: '🏋️',
    bg: 'bg-[#EFF6FF] dark:bg-[#1E293B]/60 border-[#BFDBFE]',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=200&q=80',
    ingredients: 'chicken breast, rice, broccoli, garlic, olive oil',
  },
  {
    title: 'Healthy',
    subtitle: 'Low Calorie',
    icon: '💚',
    bg: 'bg-[#E8F5E9] dark:bg-[#1A3D2A]/60 border-[#43B02A]/30',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
    ingredients: 'quinoa, spinach, cucumber, tomatoes, lemon, chickpeas',
  },
  {
    title: 'Vegetarian',
    subtitle: 'Pure Veg',
    icon: '🌱',
    bg: 'bg-[#E8F5E9] dark:bg-[#1A3D2A]/60 border-[#43B02A]/30',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80',
    ingredients: 'paneer, tomatoes, onions, garlic, spices, rice',
  },
  {
    title: 'Desserts',
    subtitle: 'Sweet Treats',
    icon: '🧁',
    bg: 'bg-[#FDF2F8] dark:bg-[#2D1A25]/60 border-[#FBCFE8]',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80',
    ingredients: 'chocolate, flour, eggs, sugar, butter',
  },
  {
    title: 'Vegan',
    subtitle: 'Plant Based',
    icon: '🥦',
    bg: 'bg-[#F0FDFA] dark:bg-[#16302B]/60 border-[#99F6E4]',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80',
    ingredients: 'tofu, broccoli, soy sauce, garlic, brown rice',
  },
]

export default function IngredientInput({ onSubmit, isLoading }: IngredientInputProps) {
  const [value, setValue] = useState('')
  const [savedRecipes, setSavedRecipes] = useState<Set<string>>(new Set())
  const [isRecording, setIsRecording] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  function handlePillClick(pillValue: string) {
    setValue((prev) => {
      const trimmed = prev.trim()
      if (!trimmed) return pillValue
      if (trimmed.toLowerCase().includes(pillValue.toLowerCase())) return prev
      return `${trimmed}, ${pillValue}`
    })
  }

  function toggleSaveRecipe(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    setSavedRecipes((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleVoiceInput() {
    setIsRecording(true)
    setTimeout(() => {
      setValue('chicken breast, garlic, olive oil, cherry tomatoes, spinach')
      setIsRecording(false)
    }, 2000)
  }

  return (
    <div className="w-full space-y-8 animate-slide-up">
      
      {/* ── 1. BRAND FEATURE BADGES ROW (Clean contrast in Light & Dark Mode) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-[#13261C] p-3.5 rounded-[24px] border border-[#E0EFE0] dark:border-[#1F3B2B] shadow-2xs">
        {FEATURE_BADGES.map((f) => {
          const IconComp = f.icon
          return (
            <div key={f.label} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#F4FBF4] dark:bg-[#1A3D2A]/60 border border-[#E0EFE0] dark:border-[#1F3B2B]">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${f.color}`}>
                <IconComp size={16} />
              </div>
              <span className="text-xs font-extrabold text-[#1E1E1E] dark:text-white leading-tight">
                {f.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── 2. NutriChef Official Hero Banner Card (100% Crisp Text in Light & Dark Mode) ── */}
      <div className="relative w-full rounded-[28px] bg-[#E8F5E9]/50 dark:bg-[#13261C] p-6 sm:p-10 border border-[#E0EFE0] dark:border-[#1F3B2B] overflow-hidden shadow-2xs">
        
        {/* Floating Decors */}
        <span className="absolute top-4 left-6 text-2xl animate-float-leaf pointer-events-none">🍃</span>
        <span className="absolute bottom-6 left-12 text-xl pointer-events-none">🍅</span>
        <span className="absolute top-12 left-1/3 text-lg pointer-events-none opacity-80">🥦</span>
        <span className="absolute bottom-16 left-1/2 text-xl pointer-events-none opacity-80">🫑</span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-8 text-center sm:text-left space-y-5">
            {/* Top Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#1A3D2A] text-[#43B02A] dark:text-[#8BC34A] font-extrabold text-[11px] uppercase tracking-wider shadow-2xs border border-[#43B02A]/30">
                <Sparkles size={13} className="text-[#FF8C42]" /> NutriChef AI &bull; Real Flavor. Made for You.
              </span>
            </div>

            {/* Headline & Subheading (High-Contrast Text in Both Light & Dark Mode) */}
            <div className="space-y-2">
              <h1 className="font-black text-3xl sm:text-5xl text-[#1E1E1E] dark:text-white tracking-tight leading-tight">
                What can AI cook <br className="hidden sm:inline" />for <span className="text-[#43B02A]">you today?</span>
              </h1>
              <p className="text-[#757576] dark:text-stone-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                Turn your available ingredients into restaurant-quality recipes using AI.
              </p>
            </div>

            {/* Central Search Input Bar */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Type ingredients e.g. 3 eggs, spinach, garlic, tomatoes..."
                  disabled={isLoading}
                  className="w-full bg-white dark:bg-[#0B1912] rounded-full py-4 px-6 pr-14 shadow-md border border-[#E0EFE0] dark:border-[#1F3B2B] text-xs sm:text-sm text-[#1E1E1E] dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#43B02A] transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !value.trim()}
                  className="absolute right-3 top-2.5 p-2.5 rounded-full bg-[#43B02A] hover:bg-[#2E7D32] text-white disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  <Sparkles size={16} />
                </button>
              </div>

              {/* Trigger Buttons Row (Clean White/Dark Outlined Pills) */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`text-xs font-bold px-4 py-2 rounded-full border transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${
                    isRecording
                      ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                      : 'bg-white dark:bg-[#13261C] text-[#1E1E1E] dark:text-white border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A]'
                  }`}
                >
                  <Mic size={14} className={isRecording ? '' : 'text-[#43B02A]'} />
                  <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="text-xs font-bold px-4 py-2 rounded-full bg-white dark:bg-[#13261C] text-[#1E1E1E] dark:text-white border border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                >
                  <Camera size={14} className="text-[#43B02A]" />
                  <span>Camera Scan</span>
                </button>

                <label className="text-xs font-bold px-4 py-2 rounded-full bg-white dark:bg-[#13261C] text-[#1E1E1E] dark:text-white border border-[#E0EFE0] dark:border-[#1F3B2B] hover:border-[#43B02A] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5">
                  <Upload size={14} className="text-[#FF8C42]" />
                  <span>Upload Photo</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Popular Ingredients Row (Ingredient Chips with Green Checkmark) */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-extrabold text-[#43B02A] uppercase tracking-wider">
                  Popular ingredients
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {POPULAR_INGREDIENTS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handlePillClick(p.value)}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white dark:bg-[#13261C] border border-[#E0EFE0] dark:border-[#1F3B2B] text-[#1E1E1E] dark:text-white hover:border-[#43B02A] hover:text-[#43B02A] transition-all cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                      <span className="w-4 h-4 rounded-full bg-[#43B02A]/15 text-[#43B02A] flex items-center justify-center">
                        <Check size={10} strokeWidth={3} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Right Banner Visual Plate */}
          <div className="lg:col-span-4 hidden lg:flex justify-center relative">
            <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-[#13261C] relative group">
              <img
                src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80"
                alt="NutriChef AI Signature Bowl"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute bottom-4 right-4 text-[10px] font-extrabold px-3.5 py-1 rounded-full bg-[#2E7D32]/90 text-white backdrop-blur-md">
                NutriChef Signature
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. "AI RECOMMENDS FOR YOU" 6-COLUMN RECIPE GRID ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#1E1E1E] dark:text-white uppercase tracking-wider">
            AI RECOMMENDS FOR YOU
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-[#43B02A] cursor-pointer hover:underline">
              See All
            </span>
            <div className="flex gap-1">
              <button aria-label="Previous" className="w-7 h-7 rounded-full bg-white dark:bg-[#13261C] border border-[#E0EFE0] dark:border-[#1F3B2B] flex items-center justify-center text-[#1E1E1E] dark:text-white hover:bg-stone-100 cursor-pointer">
                <ChevronLeft size={14} />
              </button>
              <button aria-label="Next" className="w-7 h-7 rounded-full bg-white dark:bg-[#13261C] border border-[#E0EFE0] dark:border-[#1F3B2B] flex items-center justify-center text-[#1E1E1E] dark:text-white hover:bg-stone-100 cursor-pointer">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Column Recipe Cards (Matching Component Examples in Sheet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {AI_RECOMMENDED_CARDS.map((card) => {
            const isSaved = savedRecipes.has(card.id)
            const badgeClass =
              card.difficulty === 'Easy'
                ? 'nutrichef-badge-easy'
                : card.difficulty === 'Medium'
                ? 'nutrichef-badge-medium'
                : 'nutrichef-badge-hard'

            return (
              <div
                key={card.id}
                onClick={() => onSubmit(card.ingredients)}
                className="group bg-white dark:bg-[#13261C] rounded-[22px] p-2.5 border border-[#E0EFE0] dark:border-[#1F3B2B] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 hover:border-[#43B02A]"
              >
                <div className="h-32 rounded-[16px] overflow-hidden relative bg-stone-100 dark:bg-stone-800">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rating Badge Top Left */}
                  <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/90 dark:bg-[#0B1912]/90 text-[#1E1E1E] dark:text-white flex items-center gap-1 shadow-2xs">
                    <Star size={10} className="fill-amber-400 text-amber-400" /> {card.rating}
                  </span>
                  {/* Heart Icon Top Right */}
                  <button
                    onClick={(e) => toggleSaveRecipe(card.id, e)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 dark:bg-[#0B1912]/80 backdrop-blur-md flex items-center justify-center text-stone-700 dark:text-stone-200 hover:scale-110 transition-transform"
                  >
                    <Heart size={12} className={isSaved ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-[#1E1E1E] dark:text-white leading-snug group-hover:text-[#43B02A] transition-colors line-clamp-1">
                    {card.title}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] text-[#757576] dark:text-stone-400 font-semibold pt-0.5">
                    <span className="flex items-center gap-0.5"><Clock size={10} /> {card.time}</span>
                    <span className="flex items-center gap-0.5"><Flame size={10} className="text-[#FF8C42]" /> {card.calories}</span>
                    <span className={`px-2 py-0.5 rounded-full ${badgeClass}`}>
                      {card.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 4. "EXPLORE BY CATEGORY" CARDS ── */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-[#1E1E1E] dark:text-white uppercase tracking-wider">
          EXPLORE BY CATEGORY
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.title}
              onClick={() => onSubmit(cat.ingredients)}
              className={`rounded-[20px] p-3 border transition-all cursor-pointer flex items-center justify-between h-24 ${cat.bg} hover:scale-105 shadow-2xs overflow-hidden hover:border-[#43B02A]`}
            >
              <div className="space-y-1">
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-[#1E1E1E] dark:text-white">{cat.title}</h4>
                  <p className="text-[9px] text-[#757576] dark:text-stone-400">{cat.subtitle}</p>
                </div>
              </div>

              {/* Right Side Dish Image Thumbnail */}
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white dark:border-stone-700 shadow-2xs">
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Camera Scan Modal Mockup */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#13261C] rounded-[32px] max-w-md w-full p-6 text-white text-center space-y-6 border border-[#1F3B2B] relative">
            <button
              onClick={() => setIsCameraOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X size={18} />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#43B02A]/20 text-[#43B02A] flex items-center justify-center mx-auto">
              <Camera size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl">NutriChef AI Camera Scanner</h3>
              <p className="text-xs text-stone-400">
                Point your camera at your open fridge shelf to auto-detect ingredients.
              </p>
            </div>

            <div className="h-44 rounded-2xl bg-[#0B1912] border-2 border-dashed border-[#1F3B2B] flex items-center justify-center relative overflow-hidden">
              <span className="text-xs text-stone-500">Camera Feed Initializing...</span>
              <div className="absolute inset-x-0 top-0 h-1 bg-[#43B02A] animate-pulse" />
            </div>

            <button
              onClick={() => {
                setValue('chicken breast, bell peppers, garlic, olive oil, white rice')
                setIsCameraOpen(false)
              }}
              className="w-full bg-[#43B02A] text-white py-3.5 rounded-full font-extrabold text-xs shadow-lg hover:bg-[#2E7D32]"
            >
              Capture & Scan Ingredients
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
