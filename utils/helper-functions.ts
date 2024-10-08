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
