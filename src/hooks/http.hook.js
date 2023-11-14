import { useState, useCallback, useRef } from 'react';

export const useHttp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeRequests = useRef(0);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);
        try {
            activeRequests.current++;
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Couldn't fetch ${url}. Status: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            activeRequests.current--;
            if (activeRequests.current === 0) {
                setLoading(false);
            }
            return data;
        }
        catch (e) {
            activeRequests.current--;
            if (activeRequests.current === 0) {
                setLoading(false);
            }
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loading, request, error, clearError };
}

