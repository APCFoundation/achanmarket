// Hook Template (TanStack Query)
// Location: src/features/<feature-name>/hooks/useFeature.ts
// Purpose: React hook for server state management
// Rules: Feature-specific, uses TanStack Query patterns

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys for cache management
const FEATURE_KEYS = {
  all: ['feature'] as const,
  lists: () => [...FEATURE_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...FEATURE_KEYS.lists(), filters] as const,
  details: () => [...FEATURE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...FEATURE_KEYS.details(), id] as const,
};

/**
 * Query hook for fetching data
 * 
 * Usage:
 * const { data, isLoading, error } = useFeatureList();
 * const { data } = useFeatureDetail('123');
 */
export function useFeatureList(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: FEATURE_KEYS.list(filters || {}),
    queryFn: async () => {
      const response = await fetch(`/api/feature?${new URLSearchParams(filters as Record<string, string>)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
  });
}

export function useFeatureDetail(id: string) {
  return useQuery({
    queryKey: FEATURE_KEYS.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/feature/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch detail');
      }
      return response.json();
    },
    enabled: !!id, // Only run if ID exists
  });
}

/**
 * Mutation hook for creating data
 * 
 * Usage:
 * const { mutate, isPending } = useCreateFeature();
 * mutate(data, { onSuccess: () => { ... } });
 */
export function useCreateFeature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await fetch('/api/feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate list queries to refresh data
      queryClient.invalidateQueries({ queryKey: FEATURE_KEYS.lists() });
    },
  });
}

/**
 * Mutation hook for updating data
 */
export function useUpdateFeature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) => {
      const response = await fetch(`/api/feature/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update');
      }
      
      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate specific detail and all lists
      queryClient.invalidateQueries({ queryKey: FEATURE_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: FEATURE_KEYS.lists() });
    },
  });
}

/**
 * Mutation hook for deleting data
 */
export function useDeleteFeature() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/feature/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEATURE_KEYS.lists() });
    },
  });
}
