import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apiUrl: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers';
  private apiKey: string = '&api_key=DEMO_KEY';


  constructor(
    private http: HttpClient
  ) { }

  public getPhotos(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/curiosity/photos?sol=1000&page=${page}${this.apiKey}`);
  }

  public getPhotosHeroku(): Observable<any> {
    return this.http.get('https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=1000');
  }

  public getPhotosHerokuByRover(rover, page): Observable<any> {
    return this.http.get(`https://mars-photos.herokuapp.com/api/v1/${rover}/curiosity/photos?api_key=DEMO_KEY&sol=1000`);
  }

  public  getPhotosByRover(rover: string, page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rover}/photos?sol=1000&page=${page}${this.apiKey}`);
  }

  public  getPhotosByCamera(rover: string, camera: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rover}/photos?sol=1000&camera=${camera}${this.apiKey}`);
  }

  public  getPhotosByEarthDate(rover: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rover}/photos?sol=1000${this.apiKey}`);
  }
}
