import { z } from 'zod'

export const IngredientSchema = z.object({
  id: z.string().default(() => `ing_${Math.random().toString(36).substring(2, 7)}`),
  name: z.string().min(1),
  originalAmount: z.number().positive().catch(1),
  unit: z.string().default(''),
  category: z
    .enum(['protein', 'vegetable', 'grain', 'dairy', 'fat', 'seasoning', 'sauce', 'fruit', 'other'])
    .catch('other'),
})

export const SwapSchema = z.object({
  originalIngredient: z.string().min(1),
  recommendedSwap: z.string().min(1),
  reason: z.string().min(1),
})

export const InstructionSchema = z.object({
  stepNumber: z.number().int().positive(),
  text: z.string().min(1),
  tip: z.string().nullable().optional(),
})

export const RecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  prepTime: z.string().min(1),
  cookTime: z.string().min(1),
  baseServings: z.number().int().positive().catch(2),
  ingredients: z.array(IngredientSchema).min(1),
  swaps: z.array(SwapSchema).default([]),
  instructions: z.array(InstructionSchema).min(1),
})

export type Recipe = z.infer<typeof RecipeSchema>
export type Ingredient = z.infer<typeof IngredientSchema>
export type Swap = z.infer<typeof SwapSchema>
export type Instruction = z.infer<typeof InstructionSchema>
