import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LoginCredentialModel } from 'src/app/resources/data-model/login.model';
import { FakeService } from 'src/app/resources/services/fake.service';
import { MessageService } from 'primeng/api';
import { SnackBarService } from 'src/app/resources/components/snackbar/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  @Input() message: string = '';
  @Output() informParent = new EventEmitter();

  public messages!: Message[];
  public loginForm!: FormGroup;
  public validLoginCredential:LoginCredentialModel | any = null;


  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private snackbarService: SnackBarService,
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
      this.login();
    }
  }

  public login(){
    this.router.navigate(['./employee']);
    this.fakeService.setLoggedIn();
    this.informParent.emit(this.fakeService.checkIsUserLogin())
  }

  public getValidLoginCredential(){
    this.fakeService.getFakeLoginCredential()
      .subscribe((result: any) => {
        this.validLoginCredential = result.data
    });
  }
  

}
