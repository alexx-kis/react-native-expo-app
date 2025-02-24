import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Models } from 'react-native-appwrite';

// ^======================== useAppwrite ========================^ //

export const useAppwrite = (fn: () => Promise<Models.Document[]>) => {

  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};