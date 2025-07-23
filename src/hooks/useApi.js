import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrlUsaWin } from '../utils/apis';

const useApi = (baseURL = baseUrlUsaWin) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const request = useCallback(async (method, url, data = null, config = {}) => {
        setLoading(true);
        // const userId = localStorage.getItem('userId');
        const userId = 8
        if (!userId) {
            toast.error('User not found. Please log in again.');
            // throw new Error('User ID not found');
        }
        setError(null);
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                headers: {
                    ...config?.headers,
                    'user-id': userId,
                },
                ...config,
            });
            return response;
        } catch (err) {
            if (err?.response?.status === 500) {
                console.log("error", err)
                toast.error(err.response?.data?.message|| 'Internal server error')
            } else {
                setError(err?.response);
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const get = (url, config) => request('get', url, null, config);
    const post = (url, data, config) => request('post', url, data, config);
    const put = (url, data, config) => request('put', url, data, config);
    const del = (url, config) => request('delete', url, null, config);

    return {
        get,
        post,
        put,
        del,
        loading,
        error,
    };
};

export default useApi;
