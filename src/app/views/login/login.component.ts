import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LoginCredentialModel } from 'src/app/resources/data-model/login.model';
import { FakeService } from 'src/app/resources/services/fake.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  public messages!: Message[];
  public loginForm!: FormGroup;
  public validLoginCredential:LoginCredentialModel | any = null;


  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.initForm();
    this.getValidLoginCredential();
    
  }
  

  private initForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }


  public loginValidation(){
    var isValidLogin = true;

    if(this.loginForm.value.username != this.validLoginCredential.username){
      this.messages = [{ severity: 'error', detail: 'Username tidak terdaftar' }];

      isValidLogin = false;
    } else {
      if(this.loginForm.value.password != this.validLoginCredential.password){
        this.messages = [{ severity: 'error', detail: 'Password salah' }];
        isValidLogin = false;

      }
    }

    if(isValidLogin){
      this.messages = [{ severity: 'success', detail: 'Anda berhasil login' }];
      this.login();
    }
  }


  public login(){
    this.router.navigate(['./employee'], { relativeTo: this.activatedRoute });

  }

  public getValidLoginCredential(){
    this.fakeService.getFakeLoginCredential()
      .subscribe((result: any) => {
        this.validLoginCredential = result.data
        console.log('data ===>',this.validLoginCredential)
    });
  }
  

}
