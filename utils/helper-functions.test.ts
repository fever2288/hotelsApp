import { buildUrl } from './helper-functions';
import { API_ENDPOINTS, ENDPOINT_HOTELS, HOST } from '../api';

describe('Helper Functions', () => {
  describe('buildUrl', () => {
    test('should build a URL for hotels', () => {
      const url = buildUrl('HOTELS');
      expect(url).toBe(`${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`);
    });
  });
});
