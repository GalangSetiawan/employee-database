import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SnackBarService } from 'src/app/resources/components/snackbar/snackbar.service';
import { LoginCredentialModel } from 'src/app/resources/data-model/login.model';
import { FakeService } from 'src/app/resources/services/fake.service';

@Component({
  selector: 'app-container-menu',
  templateUrl: './container-menu.component.html',
  styleUrls: ['./container-menu.component.scss'],
  providers: [MessageService]

})
export class ContainerMenuComponent implements OnInit{
  public isLoggedIn = false;
  public currentUserLogin:LoginCredentialModel | any = null;

  constructor(
    private fakeService: FakeService,
    private snackbarService: SnackBarService,
    private messageService: MessageService
  ) { 
  }



  ngOnInit(): void {
    this.isLoggedIn = this.fakeService.checkIsUserLogin()
  }

  public employeeAkses(){
    if(!this.isLoggedIn){
      this.messageService.add({ severity: 'error', summary: 'Akses ditolak', detail: 'Perlu login untuk dapat mengakses halaman Employee' });
    }
  }
  public logout(){
    this.fakeService.logout();
    this.isLoggedIn = this.fakeService.checkIsUserLogin();
  }

  public getUserLogin(){
    this.fakeService.getFakeLoginCredential()
      .subscribe((result: any) => {
        this.currentUserLogin = result.data;

        this.messageService.add({ severity: 'success', summary: 'Login berhasil', detail: 'Hi '+ this.currentUserLogin.name +', have a nice day' });

    });
  }

  public parentWillTakeAction(isLoggedIn:boolean){
    this.isLoggedIn = isLoggedIn;
    
    if(this.isLoggedIn){
      this.getUserLogin();
    }

  }
}
