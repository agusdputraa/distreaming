import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useFilters Hook - Manages URL-based filters
 */
export function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const filters = {
        search: searchParams.get('search') || '',
        genre: searchParams.get('genre') || '',
        year: searchParams.get('year') || '',
        is_series: searchParams.get('is_series') || '',
        sort_by: searchParams.get('sort_by') || '',
        sort_order: searchParams.get('sort_order') || '',
    };

    const [localSearch, setLocalSearch] = useState(filters.search);

    useEffect(() => {
        setLocalSearch(filters.search);
    }, [filters.search]);

    const updateFilter = useCallback((key, value) => {
        const params = new URLSearchParams(searchParams);
        value ? params.set(key, value) : params.delete(key);
        setSearchParams(params);
    }, [searchParams, setSearchParams]);

    const applySearch = useCallback(() => {
        updateFilter('search', localSearch.trim());
    }, [localSearch, updateFilter]);

    // Form submit handler (can be used directly)
    const handleSearchSubmit = useCallback((e) => {
        e?.preventDefault();
        applySearch();
    }, [applySearch]);

    const clearFilters = useCallback(() => {
        setSearchParams({});
        setLocalSearch('');
    }, [setSearchParams]);

    const hasActiveFilters = Object.values(filters).some(v => v !== '');
    const apiFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));

    return {
        filters,
        apiFilters,
        localSearch,
        setLocalSearch,
        updateFilter,
        applySearch,
        handleSearchSubmit,
        clearFilters,
        hasActiveFilters,
    };
}
