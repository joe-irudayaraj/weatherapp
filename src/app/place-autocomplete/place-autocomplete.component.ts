import {AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {WeatherDataComponent} from "../weather-data/weather-data.component";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";


@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    NgIf,
    MatInput,
    WeatherDataComponent,
    MatAutocompleteTrigger,
    MatButton
  ],
  templateUrl: './place-autocomplete.component.html',
  styleUrl: './place-autocomplete.component.scss'
})
export class PlaceAutocompleteComponent implements OnInit, AfterViewInit {

  @ViewChild('cityInput', {static: false}) cityInput!: ElementRef;


    cityDetails: google.maps.places.PlaceResult | undefined;
  placeChanged = signal(false);


  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

  }


  ngAfterViewInit(): void {
    //  this.initializeAutocomplete();
    const options: google.maps.places.AutocompleteOptions = {
      types: ['(cities)'],
      componentRestrictions: {country: ['US']},
      fields: ['formatted_address'],
    };

    // const autocomplete = new google.maps.places.Autocomplete(this.cityInput.nativeElement, options);
    // Ensure the Google Maps script is fully loaded
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      const autocomplete = new google.maps.places.Autocomplete(this.cityInput.nativeElement, options);
      google.maps.event.clearInstanceListeners(this.cityInput.nativeElement);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('coming here', place.formatted_address);
        if (place.formatted_address) {
          this.cityDetails = place;
          console.log(`Selected City: ${this.cityDetails.formatted_address}`);
          this.placeChanged.set(true);
          //
          //console.log(this.placeChanged() +''+this.cityDetails);
        }
      });
    } else {
      console.error('Google Maps API script not loaded');
    }
    // if(autocomplete) {


    // }

    const autocompleteService = new google.maps.places.AutocompleteService();
    this.cityInput.nativeElement.addEventListener('input', () => {
      const query = this.cityInput.nativeElement.value;
      if (query) {
        autocompleteService.getPlacePredictions({...options, input: query}, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            const limitedPredictions = predictions.slice(0, 3); // Limit to 3-4 suggestions
            console.log('Here ????');
            // You could use the predictions to display custom dropdown logic here if needed
          }
        });
      }
    });
  }


  selectTrigger($event: any) {
    console.log('Selected', $event);
  }

  searchWeather() {
    if (this.cityInput && this.cityDetails) {
      console.log('cityDetails', this.cityInput.nativeElement.value);
//      this.cityDetails=this.cityInput.nativeElement.value;
//this.placeChanged.set(true);
      const weatherApiUrl = environment.WEATHER_API_URL.replace('{API key}', environment.API_KEY).replace('{query}', <string>this.cityDetails.formatted_address);
      console.log(weatherApiUrl);
      this.httpClient.get(weatherApiUrl).subscribe({
        next: (res: any) => {
          console.log('Next', res[0].lat+' '+res[0].lon);
          const queryUrl=environment.WEATHER_QUERY_URL.replace('{API key}', environment.API_KEY).replace('{lat}', res[0].lat).replace('{lon}', res[0].lon);
          this.httpClient.get(queryUrl).subscribe((res: any) => {
            console.log('Query result', res);
          });
        }, error: (err) => {
          console.log('Error', err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }
  }
}
