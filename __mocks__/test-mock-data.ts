import { Hotel } from '../types/hotel.type';
/**
 * mockTheme is a mock object representing the theme configuration for the application used in tests.
 * It defines the colors, fonts, font weights, and font sizes.
 *
 */
export const mockTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#F2007D',
    error: '#f26b88',
    textPrimary: '#000000',
  },
  fonts: {
    body: 'Lato_400Regular',
    heading: 'BalsamiqSans_400Regular',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    caption: '12px',
    button: '14px',
    body: '16px',
    title: '20px',
  },
};

export const mockApiHotels: Hotel[] = [
  {
    id: 1,
    name: 'Hilton',
    location: {
      address: 'Gran Via',
      city: 'Madrid',
      latitude: 40.4155,
      longitude: -3.7074,
    },
    stars: 5,
    checkIn: { from: '12:00', to: '20:00' },
    checkOut: { from: '07:00', to: '10:00' },
    contact: { phoneNumber: '+34123654', email: 'hilton@gmail.com' },
    gallery: ['https://example.com/images/hilton1.jpg', 'https://example.com/images/hilton2.jpg'],
    userRating: 9.8,
    price: 100,
    currency: 'EUR',
  },
  {
    id: 2,
    name: 'Riu Hotel',
    location: {
      address: 'Plaza Espana',
      city: 'Madrid',
      latitude: 40.4169,
      longitude: -3.7037,
    },
    stars: 5,
    checkIn: { from: '14:00', to: '22:00' },
    checkOut: { from: '08:00', to: '12:00' },
    contact: { phoneNumber: '+34 123456', email: 'riu@paris.com' },
    gallery: [],
    userRating: 8.5,
    price: 83,
    currency: 'EUR',
  },
];

export const additionalApiHotels: Hotel[] = [
  {
    id: 3,
    name: 'Hotel H10',
    location: {
      address: 'Goya',
      city: 'Madrid',
      latitude: 40.4153,
      longitude: -3.6844,
    },
    stars: 4,
    checkIn: { from: '12:00', to: '23:00' },
    checkOut: { from: '09:00', to: '12:00' },
    contact: { phoneNumber: '+34 9876564', email: 'h10@hotel.com' },
    gallery: [],
    userRating: 7.4,
    price: 70,
    currency: 'EUR',
  },
];
