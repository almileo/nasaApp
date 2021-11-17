import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private API_URL: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  private API_KEY: string = 'rBFKUkzoynZF9kY93SVON7Bxlo6EQDTUy8opRi2D';
  // private API_KEY: string = 'DEMO_KEY';


  constructor(
    private http: HttpClient
  ) { }

  public getPhotosBySol(rover: string, sol: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${rover}/photos?sol=${sol}&api_key=${this.API_KEY}`);
  }

  public getLatestPhotosByRover(rover: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${rover}/latest_photos?&api_key=${this.API_KEY}`);
  }

  public  getPhotosByRover(rover: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${rover}/photos&api_key=${this.API_KEY}`);
  }

  public  getPhotosByCamera(rover: string, camera: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${rover}/photos?camera=${camera}&api_key=${this.API_KEY}`);
  }

  public  getPhotosByEarthDate(rover: string, earthDate: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${rover}/photos?earth_date=${earthDate}&api_key=${this.API_KEY}`);
  }
}
