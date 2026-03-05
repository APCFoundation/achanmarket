// API Route Template
// Location: src/app/api/<feature-name>/route.ts
// Purpose: Thin HTTP handler that delegates to services
// Rules: No business logic, always validate, return JSON

import { FeatureService } from '@/services/feature-service';

/**
 * POST handler template
 * 
 * Usage:
 * 1. Copy this file to src/app/api/<your-feature>/route.ts
 * 2. Update FeatureService import to match your service
 * 3. Adjust the handler logic for your use case
 * 4. Add other HTTP methods (GET, PUT, DELETE) as needed
 */
export async function POST(request: Request) {
  try {
    // Step 1: Parse request body
    const body = await request.json();
    
    // Step 2: Delegate to service layer
    // Service handles validation, business logic, external calls
    const result = await FeatureService.create(body);
    
    // Step 3: Return success response
    return Response.json(result, { status: 201 });
    
  } catch (error) {
    // Step 4: Handle errors consistently
    if (error instanceof Error) {
      // Return 400 for validation errors
      if (error.name === 'ZodError') {
        return Response.json(
          { error: 'Validation failed', details: error.message },
          { status: 400 }
        );
      }
      
      // Return 404 for not found
      if (error.message.includes('not found')) {
        return Response.json(
          { error: error.message },
          { status: 404 }
        );
      }
      
      // Return 500 for unexpected errors
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
    
    // Unknown error type
    return Response.json(
      { error: 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET handler template (list all)
 */
export async function GET(request: Request) {
  try {
    // Parse query params if needed
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Delegate to service
    // const results = await FeatureService.list({ limit, offset });
    
    return Response.json({
      data: [], // results,
      pagination: { limit, offset },
    });
    
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
