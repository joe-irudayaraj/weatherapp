import {
  AfterViewInit,
  Component, ElementRef, input, Input,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';
import {MatInput} from "@angular/material/input";
import {PlaceAutocompleteComponent} from "../place-autocomplete/place-autocomplete.component";
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss'
})
export class WeatherDataComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('cityInput', { static: false }) cityInput!: ElementRef;

  ngAfterViewInit(): void {
    fromEvent(this.cityInput.nativeElement, 'input').pipe(
      map((event: any) => (event.target as HTMLInputElement).value),
      debounceTime(300),  // Wait for 300ms pause in events
      distinctUntilChanged()  // Only emit if the current value is different than the last
    ).subscribe((inputValue: string) => {
      this.onPlaceChanged(inputValue);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCity']) {
      console.log('selectedCity on change weather', changes['selectedCity'].currentValue);
    }
  }

  onPlaceChanged(place: string): void {
    console.log('Place changed to:', place);
    // You can implement your logic here, such as fetching weather data
  }

  @Input() selectedCity: any;

  ngOnInit(): void {
    console.log('selectedCity weather', this.selectedCity);
  }

}
