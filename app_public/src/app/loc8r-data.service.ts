import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location, Review } from './location';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})

export class Loc8rDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  //private apiBaseUrl = 'http://localhost:3000/api';
  private apiBaseUrl = 'https://loc8rwon.herokuapp.com/api';


  public getLocations(lat: number, lng: number): Promise<Location[]> {
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
    const httpOptions={
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };

    return this.http.post(url, formData, httpOptions)
    .toPromise()
    .then(response => response as any).catch(this.handleError);
    //post를 보내는 옵션에 Beaer 토큰을 같이 보냅니다.
  }


  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User):Promise<AuthResponse>{
    return this.makeAuthApiCall('register',user);
  }

  //user 정보 받아들여서 서버에 정보를 보내준다.
  private makeAuthApiCall(urlPath: string, user: User):Promise<AuthResponse>{
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post(url, user).toPromise().then(response => response as AuthResponse).catch(this.handleError);
  }

}
