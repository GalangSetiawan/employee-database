import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { LoginCredentialModel } from 'src/app/resources/data-model/login.model';
import { FakeService } from 'src/app/resources/services/fake.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public messages!: Message[];
  public loginForm!: FormGroup;
  public validLoginCredential:LoginCredentialModel | any = null;


  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService
  ) { }

  ngOnInit() {

    this.initForm();
    this.getValidLoginCredential();
    
  }
  

  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      language: []
    });
  }


  public loginValidation(){
    var isValidLogin = true;

    if(isValidLogin){
      this.login();
    }
  }


  public login(){
    this.messages = [{ severity: 'error', detail: 'Message Content' }];
  }

  public getValidLoginCredential(){
    this.fakeService.getFakeLoginCredential()
      .subscribe((result: any) => {
        this.validLoginCredential = result.data
        console.log('data ===>',this.validLoginCredential)
    });
  }
  

}
