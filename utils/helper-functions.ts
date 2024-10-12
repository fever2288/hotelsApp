import { Image } from 'react-native';

import { HOST, API_ENDPOINTS } from '../api';
type Params = Record<string, string | number>;

/**
 * Builds a URL from a given endpoint and optional parameters.
 * Replaces any dynamic parameters in the endpoint string with their actual values.
 *
 * @param {keyof typeof API_ENDPOINTS} endpointKey - The key of the API endpoint from the API_ENDPOINTS object.
 * @param {Params} [params] - An optional object containing parameters to replace in the endpoint string.
 * @returns {string} The fully constructed URL.
 */
export const buildUrl = (endpointKey: keyof typeof API_ENDPOINTS, params?: Params): string => {
  let endpoint: string = API_ENDPOINTS[endpointKey];

  if (params) {
    Object.keys(params).forEach((param) => {
      endpoint = endpoint.replace(`:${param}`, params[param].toString());
    });
  }

  return `${HOST}${endpoint}`;
};

/**
 * Fetches a list of image URLs and checks their validity using the `Image.prefetch` method.
 * Returns an array of URLs that were successfully prefetched (i.e., valid image URLs).
 *
 * The function performs the prefetch operation for each URL concurrently using `Promise.all`.
 * If the prefetch is successful, the URL is considered valid and included in the result.
 * If the prefetch fails, the URL is ignored and not included in the returned array.
 *
 * @param {string[]} imageUrls - An array of image URLs to validate by prefetching them.
 * @returns {Promise<string[]>} A promise that resolves to an array of valid image URLs
 *                              (those that were successfully prefetched).
 *
 * @throws Will not throw an error, but invalid URLs will be excluded from the result.
 */
export const getValidImages = async (imageUrls: string[]): Promise<string[]> => {
  const results = await Promise.all(
    imageUrls.map(async (url) => {
      try {
        await Image.prefetch(url);
        return url;
      } catch {
        // Catching the error (logging if we had logger) and return null if invalid URL
        return null;
      }
    })
  );

  // Filter out null values and return only valid URLs
  return results.filter((url): url is string => url !== null);
};
