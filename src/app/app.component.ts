import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Weather';

  weatherReport: any = {};

  cityName: string = '';
  api: string = '2b6c4af07f57c2ccf98db18010b30054';

  constructor(private http: HttpClient) {}

  temp: number = 0;
  feels_like: number = 0;
  message: string = '';
  sunrise: string = '';
  sunset: string = '';

  // Uncomment to test API call
  onGetWeather() {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.api}&units=metric`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unexpected error occurred.';

          if (error.status === 404) {
            errorMessage = 'City not found. Please enter a valid city.';
          } else if (error.status === 401) {
            errorMessage = 'Invalid API key. Please check your API key.';
          } else if (error.status === 0) {
            errorMessage =
              'Unable to connect to the server. Please check your network.';
          }

          this.message = errorMessage;
          return throwError(() => new Error(errorMessage));
        })
      )
      .subscribe((result: any) => {
        this.weatherReport = result;
        this.temp = Number(result.main?.temp);
        this.feels_like = Number(result?.main?.feels_like);
        console.log(this.weatherReport);
        this.message = '';
        this.sunrise = new Date(result.sys?.sunrise * 1000).toLocaleTimeString();
        this.sunset = new Date(result.sys?.sunset * 1000).toLocaleTimeString();
      });
  }
  getTemperatureColor(temp: number): string {
    if (temp < 10) {
      return '#00aaff'; // Cold - Blue
    } else if (temp >= 10 && temp < 25) {
      return '#ffaa00'; // Mild - Orange
    } else {
      return '#ff5733'; // Hot - Red
    }
  }
}
