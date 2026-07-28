interface NutriChefLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  className?: string
}

export default function NutriChefLogo({ size = 'md', showTagline = false, className = '' }: NutriChefLogoProps) {
  const iconSizes = {
    sm: { box: 'w-8 h-8', font: 'text-lg', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { box: 'w-11 h-11', font: 'text-2xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { box: 'w-16 h-16', font: 'text-4xl', badge: 'text-xs px-2.5 py-1' },
  }

  const s = iconSizes[size]

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-2.5">
        {/* ── NutriChef Brand Vector SVG Icon ── */}
        <div className={`relative ${s.box} shrink-0 flex items-center justify-center`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xs">
            {/* Chef Hat Cloud */}
            <path
              d="M32 42C26 42 22 46 22 52C22 56 25 59 28 60.5C28 66 32 70 38 70H62C68 70 72 66 72 60.5C75 59 78 56 78 52C78 46 74 42 68 42C68 34 60 28 50 28C40 28 32 34 32 42Z"
              stroke="#43B02A"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Smiling Eyes */}
            <path d="M40 52C42 55 45 55 46 52" stroke="#43B02A" strokeWidth="4" strokeLinecap="round" />
            <path d="M54 52C55 55 58 55 60 52" stroke="#43B02A" strokeWidth="4" strokeLinecap="round" />
            
            {/* Leaf Bowl Base */}
            <path
              d="M20 62C20 78 35 90 50 90C65 90 80 78 80 62C72 74 58 80 50 80C42 80 28 74 20 62Z"
              fill="url(#leafBowlGrad)"
            />
            
            {/* Orange Soup Dish inside bowl */}
            <ellipse cx="50" cy="68" rx="16" ry="7" fill="#FF8C42" />
            <circle cx="44" cy="67" r="4.5" fill="#E53E3E" />

            {/* Sprouting Green Leaves on Right */}
            <path
              d="M72 60C78 56 86 58 88 64C82 68 74 66 72 60Z"
              fill="#43B02A"
            />
            <path
              d="M78 68C84 66 90 70 91 76C85 78 78 74 78 68Z"
              fill="#8BC34A"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="leafBowlGrad" x1="20" y1="62" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#43B02A" />
                <stop offset="1" stopColor="#2E7D32" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Brand Typography: NutriChef AI (Light Mode: #2E7D32, Dark Mode: #FFFFFF) ── */}
        <div className="flex items-center gap-1.5 select-none">
          <span className={`font-black tracking-tight ${s.font} text-[#2E7D32] dark:text-white font-['Poppins'] flex items-center`}>
            Nutr<span className="relative text-[#43B02A]">
              i
              {/* Leaf dot over 'i' */}
              <svg className="absolute -top-1 left-0.5 w-3 h-3" viewBox="0 0 24 24" fill="#43B02A">
                <path d="M17 8C8 10 5 16 3 21C8 21 14 19 17 14C18.5 11.5 18 9 17 8Z" />
              </svg>
            </span>Chef
          </span>

          {/* Orange AI Badge */}
          <span className={`nutrichef-ai-badge ${s.badge} rounded-md shadow-xs -mt-3 ml-0.5`}>
            AI
          </span>
        </div>
      </div>

      {/* Optional Tagline */}
      {showTagline && (
        <p className="text-xs font-medium text-[#43B02A] font-['Poppins'] mt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A]" />
          <span>AI Recipes. Real Flavor. Made for You.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A]" />
        </p>
      )}
    </div>
  )
}
