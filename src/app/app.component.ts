import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // ✅ Import HttpClientModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule], // ✅ Add HttpClientModule
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

  // Uncomment to test API call
  onGetWeather() {
    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.api}&units=metric`
      )
      .subscribe((result: any) => {
        this.weatherReport = result;
        this.temp = Number(result.main?.temp);
        this.feels_like = Number(result?.main?.feels_like);
        console.log(this.weatherReport);
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
