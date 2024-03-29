import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SnackBarService } from 'src/app/resources/components/snackbar/snackbar.service';
import { FakeService } from 'src/app/resources/services/fake.service';

@Component({
  selector: 'app-container-menu',
  templateUrl: './container-menu.component.html',
  styleUrls: ['./container-menu.component.scss'],
  providers: [MessageService]

})
export class ContainerMenuComponent implements OnInit{
  public isLoggedIn = false;
  messageFromChild: string = '';

  constructor(
    private fakeService: FakeService,
    private snackbarService: SnackBarService,
    private messageService: MessageService
  ) { 
  }



  ngOnInit(): void {
    this.isLoggedIn = this.fakeService.checkIsUserLogin()
    console.log('cek login ===>', this.isLoggedIn )
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

  parentWillTakeAction(isLoggedIn:boolean){
    this.isLoggedIn = isLoggedIn;
    
    if(this.isLoggedIn){
      this.messageService.add({ severity: 'success', summary: 'Selamat datang', detail: 'Welcome my baby boy' });
    }
  }
}
