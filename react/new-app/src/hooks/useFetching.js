import { useState } from "react";

// (частый кейс) обработка индикатора загрузки, обработка ошибки, и выполнение какого то колбека
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false); // наше состояние для условия, чтобы отображать что-то пока данные подгружаются с сервера
  const [error, setError] = useState('');

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch(e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}