import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NasaService } from '../services/nasa.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nasaApp';

  public photos: Array<any> = [];
  public totalPhotos: number;
  public currentPage: number = 1;
  public img: Array<any> = [];
  public rover: string = null;
  public roverSelected: boolean = false;
  public roverCuriosity: boolean = false;
  public roverOpportunity: boolean = false;
  public roverSpirit: boolean = false;
  public camera: string = null;
  public sol: string = null;
  public earthDate: string = null;
  public earth_date: string = '2021-11-15';

  model: NgbDateStruct;

  constructor(
    public nasaService: NasaService,
    private calendar: NgbCalendar
  ){

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(){
    // this.nasaService.getPhotosByCamera('curiosity', 'fhaz', '2021-11-15').subscribe((data) => {
    //   console.log('data: ', data);
      
    // })
  }

  public getPhotosByRover(rover: string, page: number) {
    this.roverSelected = false;
    this.roverCuriosity = false;
    this.roverOpportunity = false;
    this.roverSpirit = false;
    this.nasaService.getLatestPhotosByRover(rover).subscribe((data) => {
      this.photos = [];   
      this.photos = data.latest_photos; 
      this.rover = rover;
      this.roverSelected = true;
      this.totalPhotos = data.latest_photos.lenght;
      console.log('photos-rover: ', this.photos);
      console.log('this.rover: ', this.rover);
      
      
    }, (httpErrorResponse: HttpErrorResponse) => {
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    })
    if(rover === 'curiosity') {
      this.roverCuriosity = true;
    } else if (rover === 'opportunity') {
      this.roverOpportunity = true;
    } else {
      this.roverSpirit = true;
    }    
  }

  public getPhotosByCamera(rover: string, camera: string, earth_date: string) {
    console.log('rover: ', rover);
    console.log('camera: ', camera);
    
    
    this.nasaService.getPhotosByCamera(rover, camera, earth_date).subscribe((data) => {
      console.log('data: ', data);
      
      this.photos = [];   
      this.img = [];   
      this.photos = data.photos;
      console.log('photos -camera: ', this.photos);
      
    })
    this.camera = camera;
  }

  public solSearch(event) {
    this.sol = event.target.value;
  }

  public earthDateSearch(event) {
    this.earthDate = event.year.toString()+ '-' + event.month.toString() + '-' + event.day.toString();
  }

  public searchBySol() {
    this.nasaService.getPhotosBySol(this.rover, this.sol).subscribe((data) => {
      this.photos = [];
      this.photos = data.photos;
      
    }, (httpErrorResponse: HttpErrorResponse) => {
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    }) 
  }

  public searchByEarthDate() {
    this.nasaService.getPhotosByEarthDate(this.rover, this.earthDate).subscribe((data) => {
      this.photos = [];
      this.photos = data.photos;
      
    }, (httpErrorResponse: HttpErrorResponse) => {
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    })
  }

}
