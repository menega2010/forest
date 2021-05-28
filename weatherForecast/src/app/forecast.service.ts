import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators'

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  getWeatherForecast() {
    return new Observable((observer)=> {
      navigator.geolocation.getCurrentPosition((position)=>{
        observer.next(position)
      },
      (error)=>{
        observer.next(error)
      }
      )
    }).pipe(
      map((value: any)=>{
        return new HttpParams()
        .set('lon', value.coords.longitude)
        .set('lat', value.coords.latitude)
        .set('units', 'metric')
        .set('appid', '02bc8677a572a9848a043da218fd1a3c');
      }),

      switchMap((values)=>{
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', {params: values })
      })
    )
  }
}

