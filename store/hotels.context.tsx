import React, { ReactNode, createContext, useContext, useReducer } from 'react';

import { Hotel } from '../types/hotel.type';

/**
 * Represents the state for the Hotel context, which holds an array of hotels.
 */
type HotelContextState = {
  hotels: Hotel[];
};

/**
 * Action to add a list of hotels to the context.
 *
 * @property {Hotel[]} payload - The array of hotels to be added.
 */
type AddHotelsAction = {
  type: 'ADD_HOTELS';
  payload: Hotel[];
};

type Action = AddHotelsAction;

/**
 * The value provided by the HotelContext, including the list of hotels
 * and a method to add new hotels.
 *
 * @property {Hotel[]} hotels - The array of hotels stored in the context.
 * @property {(hotels: Hotel[]) => void} addHotels - Function to add new hotels to the context.
 */
type HotelContextValue = HotelContextState & {
  addHotels: (hotels: Hotel[]) => void;
};

/**
 * The initial state for the HotelContext, starting with an empty array of hotels.
 */
const initialState: HotelContextState = {
  hotels: [],
};

/**
 * Reducer function for managing hotel-related actions in the context.
 *
 * @param {HotelContextState} state - The current state of the context.
 * @param {Action} action - The action being dispatched to update the state.
 * @returns {HotelContextState} The updated state with the new hotels added.
 */
const hotelReducer = (state: HotelContextState, action: Action): HotelContextState => {
  switch (action.type) {
    case 'ADD_HOTELS':
      return {
        ...state,
        hotels: [...state.hotels, ...action.payload],
      };
    default:
      return state;
  }
};

/**
 * Create a context for managing hotel data. Initially, the context is `null`.
 */
const HotelContext = createContext<HotelContextValue | null>(null);

/**
 * Hook to access the HotelContext.
 *
 * @throws Will throw an error if used outside of the HotelProvider.
 * @returns {HotelContextValue} The context value containing the state and actions.
 */
export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (context === null) {
    throw new Error("HotelContext is null, this shouldn't happen");
  }
  return context;
};

/**
 * HotelProvider component that wraps around child components to provide hotel-related state and actions.
 *
 * @param {ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} The provider component that supplies the context to its children.
 */
export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(hotelReducer, initialState);

  /**
   * Function to add new hotels to the context.
   *
   * @param {Hotel[]} newHotels - The array of hotels to be added to the state.
   */
  const addHotels = (newHotels: Hotel[]) => {
    dispatch({ type: 'ADD_HOTELS', payload: newHotels });
  };

  const contextValue: HotelContextValue = {
    hotels: state.hotels,
    addHotels,
  };

  return <HotelContext.Provider value={contextValue}>{children}</HotelContext.Provider>;
};
