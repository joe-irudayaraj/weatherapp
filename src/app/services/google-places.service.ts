import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {

  private readonly apiKey = '<KEY>';
  private readonly url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input={query}&key={apiKey}&types=(cities)';

  constructor() {

  }
  getPlaces(query: string) {
    return fetch(this.url.replace('{query}', query).replace('{apiKey}', this.apiKey));
  }
}
