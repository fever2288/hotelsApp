import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { useEffect } from 'react';

import { API_ENDPOINTS } from '../api';
import { FetchDataOptions, FetchDataResponse } from '../types/fetch.type';
import { buildUrl } from '../utils/helper-functions';

/**
 * Custom hook `useFetchData` to fetch data from a specified API endpoint using `react-query` and axios.
 *
 * @template T - The expected response data type from the API.
 *
 * @param {keyof typeof API_ENDPOINTS} endpointKey - The key from the `API_ENDPOINTS` object to determine which API endpoint to fetch.
 * @param {Record<string, string | number>} [params] - Optional query parameters or dynamic path variables to build the API URL.
 * @param {FetchDataOptions} [options] - Optional settings for the fetch operation, such as retry logic and window focus refetching.
 *
 * @returns {FetchDataResponse<T>} - An object containing the fetched data, loading state, error state, refetch function.
 *
 * @example
 * const { data, isLoading, isError, refetch } = useFetchData<Hotel[]>('HOTELS');
 */
const useFetchData = <T = unknown,>(
  endpointKey: keyof typeof API_ENDPOINTS,
  params?: Record<string, string | number>,
  options: FetchDataOptions = {}
): FetchDataResponse<T> & { refetch: () => void } => {
  const { retry = 1, refetchOnWindowFocus = false, retryDelay } = options;
  let cancelTokenSource: CancelTokenSource;

  const url = buildUrl(endpointKey, params);

  const queryResult: UseQueryResult<T | undefined> = useQuery({
    queryKey: ['fetchData', url],
    queryFn: async (): Promise<T | undefined> => {
      cancelTokenSource = axios.CancelToken.source();
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          cancelToken: cancelTokenSource.token,
        });

        return response.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
          return undefined;
        } else {
          throw error;
        }
      }
    },
    retry,
    refetchOnWindowFocus,
    retryDelay,
    staleTime: 5000,
  });

  const { data, error, isLoading, isError, refetch, isRefetching } = queryResult;

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Component unmounted or request canceled.');
      }
    };
  }, []);

  return { data, isLoading, isError, isRefetching, error, refetch };
};

export default useFetchData;
