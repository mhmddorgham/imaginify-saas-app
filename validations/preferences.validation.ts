import { z } from "zod";

// login validation:
export const step1FormSchema = z.object({
  // age, Gender, Height, and Weight:
  age: z.string(),
  gender: z.string(),
  height: z.string(),
  weight: z.string(),
});
export const step2FormSchema = z.object({
  colors: z.string().min(1, {
    message: "Required",
  }),

  dislikedColors: z.string().min(1, {
    message: "Required",
  }),

  usualStyles: z.string().min(1, {
    message: "Required",
  }),

  occasions: z.string().min(1, {
    message: "Required",
  }),
});

export const step3FormSchema = z.object({
  preferredBrands: z.string().min(1, {
    message: "Required",
  }),
  sizes: z.string().min(1, {
    message: "Required",
  }),
  preferredClothingTypes: z.string().optional(),

  fabricPreference: z.string().optional(),
});

export const step4FormSchema = z.object({
  pastPurchases: z.string().min(1, {
    message: "Required",
  }),
  shoppingFrequency: z.string().min(1, {
    message: "Required",
  }),
  monthlyExpenditure: z.string().min(1, {
    message: "Required",
  }),
  specificFeatures: z.string().optional(),
});
