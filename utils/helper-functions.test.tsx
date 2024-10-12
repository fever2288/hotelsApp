import { buildUrl, getValidImages } from './helper-functions';
import { API_ENDPOINTS, ENDPOINT_HOTELS, HOST } from '../api';

const validImageUrls = ['https://example.com/valid1.jpg', 'https://example.com/valid2.jpg'];
const invalidImageUrls = ['https://example.com/invalid1.jpg', 'https://example.com/invalid2.jpg'];

jest.mock('react-native', () => ({
  Image: {
    prefetch: jest.fn((url) => {
      if (validImageUrls.includes(url)) {
        return Promise.resolve(true);
      } else if (invalidImageUrls.includes(url)) {
        return Promise.reject(new Error('Invalid URL'));
      }
    }),
  },
}));

describe('Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buildUrl', () => {
    test('should build a URL for hotels', () => {
      const url = buildUrl('HOTELS');
      expect(url).toBe(`${HOST}${API_ENDPOINTS[ENDPOINT_HOTELS]}`);
    });
  });

  describe('getValidImages', () => {
    test('should return only valid image URLs', async () => {
      const imageUrls = [...validImageUrls, ...invalidImageUrls];
      const result = await getValidImages(imageUrls);

      expect(result).toEqual(validImageUrls);
    });

    test('should return an empty array if no valid images', async () => {
      const result = await getValidImages(invalidImageUrls);

      expect(result).toEqual([]);
    });

    test('should return all valid images if all are valid', async () => {
      const result = await getValidImages(validImageUrls);

      expect(result).toEqual(validImageUrls);
    });
  });
});
