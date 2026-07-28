# NutriChef AI 🌿

> **AI Recipes. Real Flavor. Made for You.**  
> A smart, web-based fridge-to-recipe generator built as a web development project with the help of AI.

---

## 📌 About the Project

**NutriChef AI** solves a everyday problem: *what to cook with leftover ingredients in the fridge*.

Instead of letting groceries go to waste or spending hours searching for recipes, users simply type or select the ingredients they have on hand (e.g., *chicken breast, garlic, tomatoes, eggs*). **NutriChef AI** processes these items and instantly generates:

- 🍽️ **Appetizing Dish Title & Description**
- ⏱️ **Exact Prep Time & Cooking Time**
- 📊 **Caloric & Macronutrient Breakdown (Protein, Carbs, Fat)**
- 📝 **Interactive Ingredient Checklist with Portion Scaling**
- 🔄 **Smart AI Ingredient Substitutions**
- 🍳 **Step-by-Step Guided Cooking Instructions**
- 🍷 **Beverage & Sommelier Pairings**

---

## ✨ Features

- **Fridge-to-Recipe Engine**: Convert available ingredients into complete gourmet recipes.
- **NutriChef Theme**: Deep forest green background with vibrant light lime green UI elements for a fresh, healthy aesthetic.
- **Voice & Camera Mock Scanner**: Hands-free voice input and camera scan simulation for quick ingredient entry.
- **Interactive Guided Cooking Mode**: Fullscreen step-by-step cooking view with chef tips and step completion tracking.
- **Portion Scaler**: Dynamically scale ingredient quantities by adjusting serving sizes.
- **1-Click AI Flavor Variations**: Instantly regenerate recipes for special diets (High Protein, Healthy, Keto Low Carb, Vegan, Budget Friendly).
- **Dark / Light Mode**: Fully responsive, accessible dark and light theme switching.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons
- **Build Tool**: Vite 8
- **AI Integration**: Groq API (LLaMA 3.3 70B), OpenRouter, Gemini, or OpenAI API
- **Data Validation**: Zod schema validation

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/nutrichef-ai.git
cd nutrichef-ai

# Install dependencies using npm or pnpm
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional: Add your free Groq or OpenRouter API key
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:8443](http://localhost:8443) in your browser to view the application live!

---

## 🎓 Student Acknowledgements

Built with passion for web application development and powered by modern generative AI. Special thanks to AI pair-programming tools for assistance with design polish and TypeScript state management!

---

*NutriChef AI &copy; 2026. Made with ❤️ for healthy home cooking.*
