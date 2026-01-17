import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/genres`;

/**
 * useGenres Hook
 * 
 * Fetches all genres + CRUD operations
 */
export function useGenres() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGenres = useCallback(() => {
        setLoading(true);
        setError(null);
        
        axios
            .get(API_BASE_URL)
            .then((res) => {
                setGenres(res?.data?.genres || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch genres');
                setLoading(false);
            });
    }, []);

    // CRUD Operations
    const createGenre = useCallback(async (genreData) => {
        const token = localStorage.getItem('token');
        const res = await axios.post(API_BASE_URL, genreData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const updateGenre = useCallback(async (id, genreData) => {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${API_BASE_URL}/${id}`, genreData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const deleteGenre = useCallback(async (id) => {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.data;
    }, []);

    const getGenreById = useCallback(async (id) => {
        const res = await axios.get(`${API_BASE_URL}/${id}`);
        return res?.data?.genre || res?.data?.data || res?.data;
    }, []);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    return {
        genres,
        loading,
        error,
        refetch: fetchGenres,
        // CRUD
        createGenre,
        updateGenre,
        deleteGenre,
        getGenreById
    };
}
