// Service Template
// Location: src/services/<feature-name>-service.ts
// Purpose: Business logic, external API calls, data transformation
// Rules: Server-only, never imported in client components

import { createNFTSchema } from '@/lib/validation/nft-validation';
import { pinata } from '@/lib/config/pinataConfig';
import type { CreateNFTInput } from '@/lib/validation/nft-validation';

/**
 * Service class for feature-specific business logic
 * 
 * Usage:
 * 1. Define your Zod schema in src/lib/validation/
 * 2. Update the class name and method names to match your feature
 * 3. Implement business logic methods
 * 4. Import and use in API routes (app/api/*/route.ts)
 */
export class FeatureService {
  
  /**
   * Create operation template
   * Pattern: validate → call external API → transform → return
   */
  static async create(data: CreateNFTInput) {
    // Step 1: Validate input with Zod
    // This throws ZodError if validation fails
    const validated = createNFTSchema.parse(data);
    
    // Step 2: Call external API
    // Examples: Pinata (IPFS), Groq (AI), blockchain (read ops)
    const result = await pinata.upload.file(validated.image, {
      metadata: { name: 'upload.png' }
    });
    
    // Step 3: Transform data
    const transformed = {
      ipfsHash: result.IpfsHash,
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      timestamp: new Date().toISOString(),
    };
    
    // Step 4: Return result
    return transformed;
  }
  
  /**
   * Read operation template
   * Pattern: validate → fetch → return
   */
  static async getById(id: string) {
    // Validate ID format
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    
    // Fetch from external API or database
    // const data = await externalApi.get(id);
    
    // Return result
    return {
      id,
      // ...other fields
    };
  }
  
  /**
   * Update operation template
   * Pattern: validate → check exists → update → return
   */
  static async update(id: string, data: Partial<CreateNFTInput>) {
    // Validate
    const validated = createNFTSchema.partial().parse(data);
    
    // Check existence
    const exists = await this.getById(id);
    if (!exists) {
      throw new Error('Resource not found');
    }
    
    // Update logic here
    // const result = await database.update(id, validated);
    
    return {
      id,
      ...validated,
      updatedAt: new Date().toISOString(),
    };
  }
  
  /**
   * Delete operation template
   * Pattern: validate → delete → return confirmation
   */
  static async delete(id: string) {
    // Validate ID
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    
    // Delete logic here
    // await database.delete(id);
    
    return {
      success: true,
      deletedId: id,
    };
  }
}
