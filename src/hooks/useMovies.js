import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/movies`;

/**
 * useMovies Hook
 * 
 * Options:
 * - `fetchAll: true` → Fetch all movies at once (for admin)
 * - `fetchAll: false` (default) → Infinite scroll pagination
 */
export function useMovies(filters = {}, options = {}) {
    const { fetchAll = false } = options;
    
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination state (only for infinite scroll)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    
    // Prevent double fetch
    const isFetching = useRef(false);
    
    const LIMIT = 10;

    const buildQuery = useCallback((currentPage) => {
        const params = new URLSearchParams();
        
        if (!fetchAll) {
            params.append('page', currentPage);
            params.append('limit', LIMIT);
        }
        
        // Add filters
        if (filters.search) params.append('search', filters.search);
        if (filters.genre) params.append('genre', filters.genre);
        if (filters.year) params.append('year', filters.year);
        if (filters.is_series) params.append('is_series', filters.is_series);
        if (filters.sort_by) params.append('sort_by', filters.sort_by);
        if (filters.sort_order) params.append('sort_order', filters.sort_order);
        
        return params.toString();
    }, [filters, fetchAll]);

    const fetchMovies = useCallback((currentPage = 1, append = false) => {
        if (isFetching.current) return; 
        
        isFetching.current = true;
        setLoading(true);
        setError(null);
        
        axios
            .get(`${API_BASE_URL}?${buildQuery(currentPage)}`)
            .then((res) => {
                const newMovies = res?.data?.movies || [];
                const pagination = res?.data?.pagination;
                
                if (append && !fetchAll) {
                    setMovies(prev => [...prev, ...newMovies]);
                } else {
                    setMovies(newMovies);
                }
                
                setPage(pagination?.current_page || currentPage);
                setTotal(pagination?.total || newMovies.length);
                setHasMore(currentPage < (pagination?.last_page || 1));
                setLoading(false);
                isFetching.current = false;
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch movies');
                setLoading(false);
                isFetching.current = false;
            });
    }, [buildQuery, fetchAll]);

    // CRUD Operations
    const createMovie = useCallback(async (movieData) => {
        const token = localStorage.getItem('token');
        const res = await axios.post(API_BASE_URL, movieData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const updateMovie = useCallback(async (id, movieData) => {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${API_BASE_URL}/${id}`, movieData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const deleteMovie = useCallback(async (id) => {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const getMovieById = useCallback(async (id) => {
        const res = await axios.get(`${API_BASE_URL}/${id}`);
        return res?.data?.movie || res?.data?.data || res?.data;
    }, []);

    // Infinite scroll: load more
    const loadMore = useCallback(() => {
        if (hasMore && !loading && !fetchAll) {
            fetchMovies(page + 1, true);
        }
    }, [hasMore, loading, page, fetchMovies, fetchAll]);

    // Refetch from page 1
    const refetch = useCallback(() => {
        isFetching.current = false; 
        setPage(1);
        setMovies([]);
        fetchMovies(1, false);
    }, [fetchMovies]);

    // Initial fetch - reset isFetching when filters change
    useEffect(() => {
        isFetching.current = false; 
        setPage(1);
        setMovies([]);
        fetchMovies(1, false);
    }, [JSON.stringify(filters), fetchAll]); 
    
    return {
        movies,
        loading,
        error,
        total,
        loadMore,
        hasMore,
        refetch,
        // CRUD
        createMovie,
        updateMovie,
        deleteMovie,
        getMovieById
    };
}
