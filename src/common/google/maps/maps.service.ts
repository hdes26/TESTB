import {
  Client,
  DirectionsResponseData,
  DistanceMatrixResponse,
  DistanceMatrixResponseData,
  PlaceAutocompleteResponse,
  LatLngLiteral,
  TravelMode,
  PlaceAutocompleteResponseData,
  PlaceDetailsResponseData,
  ReverseGeocodeResponseData,
  LatLng,
} from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService extends Client {
  private readonly key = this.configService.get<string>('GOOGLE_API_KEY');

  constructor(private configService: ConfigService) {
    super({});
  }

  async getCoordinates(address: string): Promise<LatLngLiteral> {
    const result = await this.geocode({
      params: {
        address,
        key: this.key,
      },
    });
    const { lng, lat } = result.data.results[0].geometry.location;
    return { lat, lng };
  }

  async getDirectionsWaypoints(
    origin: string,
    destination: string,
    waypoints: string[],
  ): Promise<DirectionsResponseData> {
    const result = await this.directions({
      params: {
        origin,
        destination,
        waypoints,
        optimize: true,
        key: this.key,
      },
    });
    return result.data;
  }

  async getDirections(
    origin: string,
    destination: string,
  ): Promise<DirectionsResponseData> {
    const result = await this.directions({
      params: {
        origin,
        destination,
        key: this.key,
      },
    });
    return result.data;
  }

  async getDistanceMatrix(
    origins: string[],
    destinations: string[],
  ): Promise<DistanceMatrixResponse> {
    const result = await this.distancematrix({
      params: {
        origins,
        destinations,
        mode: TravelMode.driving,
        key: this.key,
      },
    });
    return result;
  }

  async getAutoCompletePlace(
    input: string,
  ): Promise<PlaceAutocompleteResponseData> {
    const result = await this.placeAutocomplete({
      params: {
        input,
        key: this.key,
      },
    });
    return result.data;
  }

  async getPlaceById(place_id: string): Promise<PlaceDetailsResponseData> {
    const result = await this.placeDetails({
      params: {
        place_id,
        key: this.key,
      },
    });
    return result.data;
  }
  async getPlaceByLocation(latlng: LatLng): Promise<ReverseGeocodeResponseData> {
    const result = await this.reverseGeocode({
      params: {
        latlng,
        key: this.key,
      },
    });
    return result.data;
  }
}
