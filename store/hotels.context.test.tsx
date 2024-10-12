import { act } from '@testing-library/react';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { HotelProvider, useHotelContext } from './hotels.context';
import { Hotel } from '../types/hotel.type';
import { mockApiHotels, additionalApiHotels } from '../utils/test-mock-data';

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
