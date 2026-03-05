// Validation Schema Template (Zod)
// Location: src/lib/validation/<feature-name>-validation.ts
// Purpose: Input validation schemas and TypeScript types
// Rules: All external inputs must be validated

import { z } from 'zod';

/**
 * Base schema for feature
 * Customize fields based on your data model
 */
export const featureSchema = z.object({
  // String fields
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  
  // Number fields
  maxSupply: z.number()
    .int('Must be an integer')
    .positive('Must be positive'),
  
  // Price as string (for precision with decimals)
  price: z.string()
    .regex(/^\d+(\.\d+)?$/, 'Invalid price format'),
  
  // File upload
  image: z.instanceof(File)
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      'File must be less than 10MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      'Only JPEG, PNG, and GIF are supported'
    ),
  
  // Boolean fields
  isActive: z.boolean().default(true),
  
  // Array fields
  tags: z.array(z.string()).optional(),
  
  // Object fields (nested validation)
  metadata: z.object({
    key: z.string(),
    value: z.string(),
  }).optional(),
  
  // Date fields
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * Create schema (all fields required except optional ones)
 */
export const createFeatureSchema = featureSchema;

/**
 * Update schema (all fields optional)
 */
export const updateFeatureSchema = featureSchema.partial();

/**
 * ID param schema (for route params)
 */
export const idSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

/**
 * Query params schema (for list endpoints)
 */
export const queryParamsSchema = z.object({
  limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  offset: z.string().optional().transform((val) => (val ? parseInt(val) : 0)),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'createdAt', 'price']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * TypeScript types inferred from schemas
 */
export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;
export type UpdateFeatureInput = z.infer<typeof updateFeatureSchema>;
export type IdParam = z.infer<typeof idSchema>;
export type QueryParams = z.infer<typeof queryParamsSchema>;

/**
 * NFT-specific example (from real-world usage)
 * Delete or customize for your needs
 */
export const createNFTSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(1000).optional(),
  maxSupply: z.number().int().positive(),
  price: z.string().regex(/^\d+(\.\d+)?$/, 'Invalid price'),
  image: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'File must be less than 10MB'
  ),
});

export type CreateNFTInput = z.infer<typeof createNFTSchema>;
