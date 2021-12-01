import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { Authresponse } from './authresponse';
import { Loc8rDataService } from './loc8r-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private loc8rDataService: Loc8rDataService
  ) { }

  //loc8r-token키를 가져오기
  public getToken(): string{
    return this.storage.getItem('loc8r-token');
  }

  //loc8r-token키를 저장
  public saveToken(token: string): void {
    this.storage.setItem('loc8r-token', token);
  }

  //반환타입은 Promise 이다
  public login(user: User): Promise<any> {
    return this.loc8rDataService.login(user)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }

  public register(user: User): Promise<any>{
    return this.loc8rDataService.register(user)
      .then((authResp: Authresponse) => this.saveToken(authResp.token));
  }

  public isLoggedIn():boolean{
    const token: string = this.getToken();
    if(token){
      //토큰의 3개의 부분중 2번째만 payload입니다.
      const payload = JSON.parse(atob(token.split('.')[1]));
      //payload의 만료기간이 현재시간보다 높다면 true리턴
      //milsecond로 나와있기 때문에 1000으로 나눕니다.
      return payload.exp > (Date.now() / 1000);
    } else{
      return false
    }
  }
  
  //"noImplicitReturns": false 해야 오류가 안난다.
  // noImplicitReturns : 옵션을 켜면, 함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러를 발생시킨다.
  //login 되어있다면 token에서 email과 name을 가져갑니다.
  public getCurrentUser() : User{
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    
  }

}
