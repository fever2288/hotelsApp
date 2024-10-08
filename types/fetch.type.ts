/**
 * Represents the response from the `useFetchData` hook.
 *
 * @template T - The type of data being fetched.
 *
 * @property {T | undefined} data - The data returned from the API request, or `undefined` if the request failed or hasn't completed yet.
 * @property {boolean} isLoading - Indicates whether the data is currently being fetched.
 * @property {boolean} isError - Indicates whether the API request resulted in an error.
 * @property {boolean} isRefetching - Indicates whether a refetch operation is currently in progress.
 * @property {unknown} error - The error returned from the API request, if it has error.
 */
export type FetchDataResponse<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  error: unknown;
};

/**
 * Represents optional settings for configuring the `useFetchData` hook's behavior.
 *
 * @property {number} [retry] - The number of retry attempts if the request fails. Defaults to `1` if not provided.
 * @property {boolean} [refetchOnWindowFocus] - If `true`, refetches the data when the window gains focus. Defaults to `false`.
 * @property {number} [retryDelay] - The delay between retry attempts. If not provided, `react-query`'s default retry delay is used.
 */
export type FetchDataOptions = {
  retry?: number;
  refetchOnWindowFocus?: boolean;
  retryDelay?: number;
};
