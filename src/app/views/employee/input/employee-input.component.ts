import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/services/fake.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderModel } from 'src/app/resources/data-model/gender.model';
import { AgamaModel } from 'src/app/resources/data-model/agama.model';
import { StatusPernihanModel } from 'src/app/resources/data-model/status-pernikahan.model';
import { StatusKepegawaianModel } from 'src/app/resources/data-model/status-kepegawaian.model';
import { ApiService } from 'src/app/resources/services/api.service';
import { GlobalDataModel } from 'src/app/resources/data-model/global-data.model copy';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.scss'],
  providers: [MessageService]

})
export class EmployeeInputComponent implements OnInit {

  public items: MenuItem[] = [];
  public activeIndex: number = 0;
  public inputForm!: FormGroup;

  public jenisKelaminList: GenderModel[] = [];
  public agamaList: AgamaModel[] = [];
  public statusPernikahanList: StatusPernihanModel[] = [];
  public statusPtkpList: StatusKepegawaianModel[] = [];
  public provinsiList: GlobalDataModel[] = [];

  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.initForm();
    this.items = [
      {
          label: 'Personal',
          command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
      },
      {
          label: 'Seat',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
      },
      {
          label: 'Payment',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
      },
      {
          label: 'Confirmation',
          command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
      }
     ];


     this.initJenisKelamin();
     this.initAgama();
     this.initStatusPernikahan();
     this.initStatusPtkp();
     this.getProvinsi();
  }



  public initForm(){
    this.inputForm = this.fb.group({
      username: ['', Validators.required],
      nik: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryBirth: ['', Validators.required],
      akaa: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      employeeStatus: ['', Validators.required],
      marriageStatus: ['', Validators.required],
      departement: ['', Validators.required],
      address: ['', Validators.required],
      identityNumber: ['', Validators.required],
      ptkpStatus: ['', Validators.required],

      telpNumber: null,
      phoneNumber: null,
      email: [null, Validators.required],

      isDiffDomicili: false,

      idAddress:null,
      idProvinsi:null,
      
    })
  }

  // free API untuk get data lokasi di indonesia
  // https://ibnux.github.io/data-indonesia/contoh.html

  public getProvinsi(){
    this.api.getProvinsi().subscribe(res => {
      this.provinsiList = res;
      console.log('getProvinsi response', this.provinsiList);
    });
  }

  public initStatusPtkp(){
  
    this.fakeService.getStatusPtkp()
      .subscribe((result: any) => {
        this.statusPtkpList = result.data;
        console.log(' this.statusPtkpList ===>',  this.statusPtkpList)
    });
    
  }

  public initStatusPernikahan(){
  
    this.fakeService.getStatusPernikahan()
      .subscribe((result: any) => {
        this.statusPernikahanList = result.data;
        console.log(' this.statusPernikahanList ===>',  this.statusPernikahanList)
    });
    
  }

  public initJenisKelamin(){
  
    this.fakeService.getJenisKelamin()
      .subscribe((result: any) => {
        this.jenisKelaminList = result.data;
        console.log(' this.jenisKelaminList ===>',  this.jenisKelaminList)
    });
    
  }

  public initAgama(){
  
    this.fakeService.getAgama()
      .subscribe((result: any) => {
        this.agamaList = result.data;
        console.log(' this.agamaList ===>',  this.agamaList)
    });
    
  }

  public onActiveIndexChange(event:any) {
    this.activeIndex = event;
  }

}
