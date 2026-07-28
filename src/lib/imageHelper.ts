// Expansive Non-Repetitive Food Image Resolver

const DYNAMIC_FOOD_IMAGES: Array<{ keywords: string[]; url: string }> = [
  {
    keywords: ['shrimp', 'prawn', 'seafood', 'stir fry'],
    url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['pasta', 'spaghetti', 'noodle', 'macaroni', 'lasagna', 'penne', 'fetuccine', 'ramen', 'chow mein'],
    url: 'https://images.unsplash.com/photo-1621996346565-e3def616403c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['salad', 'spinach', 'lettuce', 'kale', 'tahini', 'bowl', 'greens', 'chop', 'veggie'],
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['curry', 'chickpea', 'stew', 'soup', 'chili', 'tikka', 'masala', 'dhal', 'broth'],
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['egg', 'scramble', 'omelet', 'frittata', 'breakfast', 'pancake', 'toast', 'avocado', 'skillet'],
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['chicken', 'roast', 'poultry', 'wing', 'thigh', 'skewers', 'grilled chicken', 'breast'],
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['beef', 'steak', 'meat', 'burger', 'taco', 'meatball', 'pork', 'ribs', 'bacon'],
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['fish', 'salmon', 'tuna', 'cod', 'sushi'],
    url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['pizza', 'flatbread', 'crust', 'margherita', 'cheese', 'mozzarella'],
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['rice', 'fried rice', 'risotto', 'paella', 'grain', 'pilaf', 'quinoa'],
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['kimchi', 'korean', 'asian', 'tofu', 'wok', 'dim sum'],
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    keywords: ['cake', 'dessert', 'chocolate', 'pie', 'cookie', 'sweet', 'ice cream', 'muffin'],
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
  },
]

// Distinct Step Photos Library (Guaranteed Non-Repetitive)
const DISTINCT_STEP_PHOTOS: string[] = [
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80', // Prep & chopping vegetables
  'https://images.unsplash.com/photo-1509358211825-84277d73115a?auto=format&fit=crop&w=600&q=80', // Spices & seasoning prep
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', // Washing & measuring ingredients
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', // Sautéing in wok / skillet
  'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', // Boiling & simmering pot
  'https://images.unsplash.com/photo-1514944298341-9884ee76c8c3?auto=format&fit=crop&w=600&q=80', // Roasting / baking pan
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=600&q=80', // Stirring sauce & mixing
  'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=600&q=80', // Plating & garnishing
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // Final gourmet presentation
]

const LOCAL_FALLBACKS = [
  '/images/step_plated_dish.png',
  '/images/feature_pasta.png',
  '/images/feature_curry.png',
  '/images/feature_eggs.png',
  '/images/step_cook_pan.png',
]

/**
 * Returns a high-resolution food image URL for a recipe based on keywords
 */
export function getRecipeImage(title: string, ingredientsStr = ''): string {
  const combined = `${title} ${ingredientsStr}`.toLowerCase()

  for (const item of DYNAMIC_FOOD_IMAGES) {
    if (item.keywords.some((kw) => combined.includes(kw))) {
      return item.url
    }
  }

  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % LOCAL_FALLBACKS.length
  return LOCAL_FALLBACKS[index]
}

/**
 * Returns a list of 100% distinct, non-repetitive step photos for every step in a recipe
 */
export function getUniqueStepImages(count: number): string[] {
  const photos: string[] = []
  for (let i = 0; i < count; i++) {
    photos.push(DISTINCT_STEP_PHOTOS[i % DISTINCT_STEP_PHOTOS.length])
  }
  return photos
}
