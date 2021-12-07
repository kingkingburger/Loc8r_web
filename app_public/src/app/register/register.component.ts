import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  public pageContent = {
    header: {
      title: 'Create an account',
      strapline: ''
    },
    sidebar: ''
  }
 
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
  }

  public onRegisterSubmit(): void{
    this.formError='';
    if(
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ){
      this.formError = 'All fields are required, please try again';
    }else{
      this.doRegister();
    }
  }

  private doRegister(): void{
    //form에서 들어온 값으로 등록을 하고
    this.authenticationService.register(this.credentials)
    //초기 화면으로 돌려보냅니다.
    .then(() => this.router.navigateByUrl(this.historyService.getLastNonLoginUrl()))
    .catch((message) => this.formError = message);
  }

}
