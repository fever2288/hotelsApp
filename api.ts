/**
 * The base URL for the API requests.
 * This is the root URL used to make network requests for all endpoints in the application.
 *
 * Example:
 * - For a request to fetch hotels, the full URL would be `${HOST}/hotels`.
 */
const HOST = 'https://075b08ba-4190-4c64-9265-1d5d91c1745f.mock.pstmn.io';

/**
 * Endpoint name for fetching the list of hotels.
 *
 */
export const ENDPOINT_HOTELS = 'HOTELS';

/**
 * This object defines the available API routes relative to the HOST.
 *
 * - [ENDPOINT_HOTELS]: Defines the `/hotels` endpoint to fetch the list of hotels.
 *
 * Example Usage:
 * ```ts
 * const url = `${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`;
 * // This generates the URL: 'https://075b08ba-4190-4c64-9265-1d5d91c1745f.mock.pstmn.io/hotels'
 * ```
 */
const API_ENDPOINTS = {
  [ENDPOINT_HOTELS]: '/hotels',
} as const;

export { HOST, API_ENDPOINTS };
