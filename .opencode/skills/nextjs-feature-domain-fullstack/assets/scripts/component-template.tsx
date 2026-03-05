// Component Template
// Location: src/features/<feature-name>/index.tsx
// Purpose: Main feature entry component
// Rules: Self-contained, feature-specific, no cross-feature imports

'use client';

import { useState } from 'react';
import { useCreateFeature } from './hooks/useFeature';
// Import private components from feature's components/ directory
// import { FormControl } from './components/FormControl';
// import { PreviewCard } from './components/PreviewCard';

/**
 * Feature Component Template
 * 
 * This is the main entry point for the feature.
 * It should:
 * 1. Manage local state (forms, UI state)
 * 2. Use feature-specific hooks for server state
 * 3. Compose child components from components/
 * 4. Handle user interactions
 * 
 * Usage:
 * Import and use in page components:
 * import { FeatureName } from '@/features/feature-name';
 * 
 * export default function Page() {
 *   return <FeatureName />;
 * }
 */

// Define form data type
interface FormData {
  name: string;
  description: string;
  image: File | null;
  maxSupply: number;
  price: string;
}

export function FeatureName() {
  // Local state for form
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    image: null,
    maxSupply: 100,
    price: '0.01',
  });
  
  // Server state via TanStack Query
  const { mutate, isPending, error, isSuccess } = useCreateFeature();
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submission
    if (!formData.name || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Call mutation
    mutate(formData, {
      onSuccess: (data) => {
        console.log('Created successfully:', data);
        // Reset form or redirect
        setFormData({
          name: '',
          description: '',
          image: null,
          maxSupply: 100,
          price: '0.01',
        });
      },
      onError: (error) => {
        console.error('Creation failed:', error);
      },
    });
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Feature</h1>
      
      {/* Success message */}
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Created successfully!
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error.message}
        </div>
      )}
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter name"
            required
          />
        </div>
        
        {/* Description field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
            rows={3}
            placeholder="Enter description"
          />
        </div>
        
        {/* Max Supply field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Max Supply
          </label>
          <input
            type="number"
            value={formData.maxSupply}
            onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border rounded"
            min={1}
          />
        </div>
        
        {/* Price field */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Price (ETH)
          </label>
          <input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
            placeholder="0.01"
          />
        </div>
        
        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData(prev => ({ ...prev, image: file }));
            }}
            className="w-full"
            required
          />
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

/**
 * Export additional feature components from here
 * These are the public API of the feature
 */
export { FeatureName as default };
