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
    // this.nasaService.getLatestPhotos().subscribe((data) => {
    //   this.photos = [];  
    //   console.log('photos resp- ', data) 
    //   this.photos = data.latest_photos
    //   console.log('this.photos: ', this.photos);
    // }, (httpErrorResponse: HttpErrorResponse) => {
    //   console.log(httpErrorResponse);
    //   alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    // });
  }

  public getPhotosByRover(rover: string, page: number) {
    this.roverSelected = false;
    this.roverCuriosity = false;
    this.roverOpportunity = false;
    this.roverSpirit = false;
    this.nasaService.getLatestPhotosByRover(rover).subscribe((data) => {
      this.photos = [];   
      this.photos = data.latest_photos; 
      console.log('this.photos-ROVER: ', this.photos);
      this.rover = rover;
      this.roverSelected = true;
      this.totalPhotos = data.latest_photos.lenght;
    }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
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

  public getPhotosByCamera(rover: string, camera: string) {
    this.nasaService.getPhotosByCamera(rover, camera).subscribe((photos) => {
      this.photos = [];   
      this.img = [];   
      Object.values(photos).forEach((p) => {
        this.photos.push(p);
      })
      console.log('this.photos-CAMERA: ', this.photos);
      this.photos.forEach((photo) => {
        console.log(photo);
        photo.forEach(element => {
          this.img.push(element.img_src);
        });
      });
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
      console.log('photos - searchBySol: ', this.photos);
      
    }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    })
    
  }

  public searchByEarthDate() {
    this.nasaService.getPhotosByEarthDate(this.rover, this.earthDate).subscribe((data) => {
      this.photos = [];
      this.photos = data.photos;
      console.log('photos - searchByEarthDate: ', this.photos);
      
    }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    })
    
  }

}
