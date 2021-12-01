import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location, Review } from './location';
import { User } from './user';
import { Authresponse } from './authresponse';

@Injectable({
  providedIn: 'root'
})

export class Loc8rDataService {
  constructor(private http: HttpClient) { }
  private apiBaseUrl = 'http://localhost:3000/api';
  //private apiBaseUrl = 'https://loc8rwon.herokuapp.com/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    //const lng: number = 126.941387;
    //const lat: number = 37.473339;
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }
  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError);
  }

  public addReviewByLocationId(locationId: string, formData: any):Promise<any> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User):Promise<Authresponse>{
    return this.makeAuthApiCall('login',user);
  }

  public register(user: User):Promise<Authresponse>{
    return this.makeAuthApiCall('register',user);
  }

  //user 정보 받아들여서 서버에 정보를 보내준다.
  private makeAuthApiCall(urlPath: string, user: User):Promise<Authresponse>{
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user).toPromise().then(response => response as Authresponse)
      .catch(this.handleError);
  }

}
