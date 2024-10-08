/**
 * Represents a hotel and its detailed information.
 *
 * @property {number} id - The unique identifier for the hotel.
 * @property {string} name - The name of the hotel.
 * @property {Object} location - The location details of the hotel.
 * @property {string} location.address - The street address of the hotel.
 * @property {string} location.city - The city of hotel.
 * @property {number} location.latitude - The latitude of the hotel's location.
 * @property {number} location.longitude - The longitude of the hotel's location.
 * @property {number} stars - The star rating of the hotel.
 * @property {Object} checkIn - The check-in time details.
 * @property {string} checkIn.from - The earliest check in time.
 * @property {string} checkIn.to - The latest check in time.
 * @property {Object} checkOut - The check-out time details.
 * @property {string} checkOut.from - The earliest check out time.
 * @property {string} checkOut.to - The latest check out tiem.
 * @property {Object} contact - The contact details for the hotel.
 * @property {string} contact.phoneNumber - The hotel's phone number.
 * @property {string} contact.email - The hotel's contact email.
 * @property {string[]} gallery - An array of URLs representing images of the hotel.
 * @property {number} userRating - The average user rating for the hotel.
 * @property {number} price - The price per night for a room in the hotel.
 * @property {string} currency - The currency of the price.
 */
export type Hotel = {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  stars: number;
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  contact: {
    phoneNumber: string;
    email: string;
  };
  gallery: string[];
  userRating: number;
  price: number;
  currency: string;
};
