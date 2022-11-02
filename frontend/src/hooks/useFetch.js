import { useEffect, useState } from 'react';

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    
        const getData = async () => {
            try {
                const response = await fetch(endpoint);
                if (!response.ok){
                    throw new Error(`HTTP error: Status ${response.status} from ${endpoint}`);
                }
                let responseData = await response.json();
                setData(responseData);
                setError(null);
            } catch(e) {
                setError(e);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [endpoint]);
    return {
        data: data,
        isLoading: isLoading,
        error: error,
        setData: setData
    }
}

export default useFetch;