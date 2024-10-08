import { act } from '@testing-library/react';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { HotelProvider, useHotelContext } from './hotels.context';
import { Hotel } from '../types/hotel.type';

const mockApiHotels: Hotel[] = [
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
    gallery: [],
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

const additionalApiHotels: Hotel[] = [
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

const TestConsumer = ({ onReady }: { onReady: (addHotels: (hotels: Hotel[]) => void) => void }) => {
  const context = useHotelContext();

  onReady(context.addHotels);

  return (
    <>
      {context.hotels.length > 0 ? (
        <>
          {context.hotels.map((hotel) => (
            <Text key={hotel.id}>
              {hotel.name} in {hotel.location.city} with {hotel.stars} stars
            </Text>
          ))}
        </>
      ) : (
        <Text>No Hotels</Text>
      )}
    </>
  );
};

describe('HotelProvider', () => {
  test('should render with default value (empty hotels)', () => {
    const { getByText } = render(
      <HotelProvider>
        <TestConsumer onReady={() => {}} />
      </HotelProvider>
    );

    expect(getByText('No Hotels')).toBeTruthy();
  });

  test('should add hotels when hotels are fetched from API', async () => {
    let addHotelsFunc: (hotels: Hotel[]) => void = () => {};

    const { getByText } = render(
      <HotelProvider>
        <TestConsumer
          onReady={(addHotels) => {
            addHotelsFunc = addHotels;
          }}
        />
      </HotelProvider>
    );

    await act(async () => {
      addHotelsFunc(mockApiHotels);
    });

    expect(getByText('Hilton in Madrid with 5 stars')).toBeTruthy();
    expect(getByText('Riu Hotel in Madrid with 5 stars')).toBeTruthy();
  });

  test('should update hotels when additional hotels are fetched from API', async () => {
    let addHotelsFunc: (hotels: Hotel[]) => void = () => {};

    const { getByText } = render(
      <HotelProvider>
        <TestConsumer
          onReady={(addHotels) => {
            addHotelsFunc = addHotels;
          }}
        />
      </HotelProvider>
    );

    await act(async () => {
      addHotelsFunc(mockApiHotels);
    });

    expect(getByText('Hilton in Madrid with 5 stars')).toBeTruthy();
    expect(getByText('Riu Hotel in Madrid with 5 stars')).toBeTruthy();

    await act(async () => {
      addHotelsFunc(additionalApiHotels);
    });

    expect(getByText('Hotel H10 in Madrid with 4 stars')).toBeTruthy();
  });
});
