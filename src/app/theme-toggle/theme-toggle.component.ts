import {Component, signal, Signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgClass, NgStyle} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {AbstractControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgClass,
    MatToolbar,
    NgStyle
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {

  private isDarkTheme = signal(false);

  constructor() {
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkTheme()) {
      console.log('dark');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      console.log('light');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  get theme() {
    return this.isDarkTheme() ? 'dark_mode' : 'light_mode';
  }

}
