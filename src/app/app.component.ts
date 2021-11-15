import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NasaService } from '../services/nasa.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nasaApp';

  public photos: Array<any> = [];
  public img: Array<any> = [];
  public rover: string = null;
  public roverSelected: boolean = false;
  public roverCuriosity: boolean = false;
  public roverOpportunity: boolean = false;
  public roverSpirit: boolean = false;
  private page: string;
  private camera: string = null;
  private sol: string;

  constructor(
    public nasaService: NasaService
  ){}

  ngOnInit(){
    // this.nasaService.getPhotosHeroku().subscribe((photos) => {
    //   this.photos = [];      
    //   Object.values(photos).forEach((p) => {
    //     this.photos.push(p);
    //   })
    //   console.log('this.photos: ', this.photos);
    //   this.photos.forEach((photo) => {
    //     console.log(photo);
    //     photo.forEach(element => {
    //       this.img.push(element.img_src);
    //     });
        
    //     console.log('this.img: ', this.img);
        
    //   });
    // });
  }

  public getPhotosByRover(rover: string, page: number) {
    this.roverSelected = false;
    this.roverCuriosity = false;
    this.roverOpportunity = false;
    this.roverSpirit = false;
    this.nasaService.getPhotosByRover(rover, page).subscribe((photos) => {
      this.photos = [];   
      this.img = [];   
      Object.values(photos).forEach((p) => {
        this.photos.push(p);
      })
      console.log('this.photos-ROVER: ', this.photos);
      this.photos.forEach((photo) => {
        console.log(photo);
        photo.forEach(element => {
          this.img.push(element.img_src);
        });
      });
    }, (httpErrorResponse: HttpErrorResponse) => {
      console.log(httpErrorResponse);
      alert('There is an error with the request ' + httpErrorResponse.statusText + ' please try again later');      
    })
    this.rover = rover;
    this.roverSelected = true;
    if(rover === 'curiosity') {
      this.roverCuriosity = true;
    } else if (rover === 'opportunity') {
      this.roverOpportunity = true;
    } else {
      this.roverSpirit = true;
    }
    console.log('rover: ', this.rover);
    
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

}
