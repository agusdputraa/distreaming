import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthHeader = useCallback(() => {
        const token = localStorage.getItem('token');
        return { 'Authorization': `Bearer ${token}` };
    }, []);

    const fetchUsers = useCallback(() => {
        setLoading(true);
        setError(null);
        
        axios
            .get(API_BASE_URL, { headers: getAuthHeader() })
            .then((res) => {
                setUsers(res?.data?.users || res?.data?.data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to fetch users');
                setLoading(false);
            });
    }, [getAuthHeader]);

    // CRUD Operations
    const createUser = useCallback(async (userData) => {
        const res = await axios.post(API_BASE_URL, userData, {
            headers: getAuthHeader()
        });
        return res.data;
    }, [getAuthHeader]);

    const updateUser = useCallback(async (id, userData) => {
        const res = await axios.put(`${API_BASE_URL}/${id}`, userData, {
            headers: getAuthHeader()
        });
        return res.data;
    }, [getAuthHeader]);

    const deleteUser = useCallback(async (id) => {
        const res = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return res.data;
    }, [getAuthHeader]);

    const getUserById = useCallback(async (id) => {
        const res = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: getAuthHeader()
        });
        return res?.data?.user || res?.data?.data || res?.data;
    }, [getAuthHeader]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        refetch: fetchUsers,
        // CRUD
        createUser,
        updateUser,
        deleteUser,
        getUserById
    };
}
