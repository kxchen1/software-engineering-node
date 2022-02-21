/**
 * @file Declares the location with the data of latitude and longitude
 */

/**
 * @typedef Location Represents the location data of the user
 * @property {number} latitude number of the latitude
 * @property {number} longitude number of the longitude
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};
