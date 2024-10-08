import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

import useFetchData from './useFetchData';
import { API_ENDPOINTS, ENDPOINT_HOTELS, HOST } from '../api';

const mockAxios = new MockAdapter(axios);
const queryClient = new QueryClient();

const createQueryWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useFetchData Hook', () => {
  afterEach(() => {
    mockAxios.reset();
    queryClient.clear();
  });

  test('should return data when API call is successful', async () => {
    const mockData = { name: 'Hilton', location: 'Madrid' };
    const fullUrl = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
    mockAxios.onGet(fullUrl).reply(200, mockData);

    const { result } = renderHook(() => useFetchData(ENDPOINT_HOTELS), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isRefetching).toBe(false);
  });

  test('should handle loading state', () => {
    const { result } = renderHook(() => useFetchData(ENDPOINT_HOTELS), {
      wrapper: createQueryWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.isRefetching).toBe(false);
  });

  test('should return error when API call fails', async () => {
    const fullUrl = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
    mockAxios.onGet(fullUrl).reply(500);

    const { result } = renderHook(() => useFetchData(ENDPOINT_HOTELS, undefined, { retry: 0 }), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 1500,
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isRefetching).toBe(false);
  });

  test('should respect retry option', async () => {
    const fullUrl = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
    mockAxios.onGet(fullUrl).reply(500);

    const { result } = renderHook(
      () => useFetchData(ENDPOINT_HOTELS, undefined, { retry: 2, retryDelay: 200 }),
      {
        wrapper: createQueryWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 5000,
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isRefetching).toBe(false);
  });

  test('should respect refetchOnWindowFocus option', async () => {
    const mockData = { name: 'Hilton', location: 'Madrid' };
    const fullUrl = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
    mockAxios.onGet(fullUrl).reply(200, mockData);

    const { result } = renderHook(
      () => useFetchData(ENDPOINT_HOTELS, undefined, { refetchOnWindowFocus: true }),
      {
        wrapper: createQueryWrapper(),
      }
    );

    await waitFor(() => expect(result.current.data).toEqual(mockData));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isRefetching).toBe(false);
  });

  test('should handle refetching state when refetch is triggered', async () => {
    const mockData = { name: 'Hilton', location: 'Madrid' };
    const fullUrl = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
    mockAxios.onGet(fullUrl).reply(200, mockData);

    const { result } = renderHook(() => useFetchData(ENDPOINT_HOTELS), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.data).toEqual(mockData));

    mockAxios.onGet(fullUrl).reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([200, mockData]), 300);
      });
    });

    result.current.refetch();

    await waitFor(() => expect(result.current.isRefetching).toBe(true), { timeout: 500 });

    await waitFor(() => expect(result.current.isRefetching).toBe(false));

    expect(result.current.data).toEqual(mockData);
  });
});
