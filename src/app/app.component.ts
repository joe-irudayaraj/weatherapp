import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {PlaceAutocompleteComponent} from "./place-autocomplete/place-autocomplete.component";
import {ThemeToggleComponent} from "./theme-toggle/theme-toggle.component";
import {WeatherDataComponent} from "./weather-data/weather-data.component";
import {CdkAutofill} from "@angular/cdk/text-field";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatAutocomplete, MatOption, MatLabel, NgForOf, MatAutocompleteTrigger, ReactiveFormsModule, AsyncPipe, MatCard, MatToolbar, MatFormField, PlaceAutocompleteComponent, ThemeToggleComponent, MatCardTitle, MatCardContent, WeatherDataComponent, CdkAutofill],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'weatherapp';
   selectedCity: any

  ngOnInit() {

  }


  sendData($event: any) {
    console.log('cityDetails', $event);
    this.selectedCity = $event.formatted_address;
  }
}
