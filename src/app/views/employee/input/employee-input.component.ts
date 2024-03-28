import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/services/fake.service';
import { EmployeeService } from 'src/app/resources/services/employee.service';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderModel } from 'src/app/resources/data-model/gender.model';
import { AgamaModel } from 'src/app/resources/data-model/agama.model';
import { StatusPernihanModel } from 'src/app/resources/data-model/status-pernikahan.model';
import { StatusKepegawaianModel } from 'src/app/resources/data-model/status-kepegawaian.model';
import { ApiService } from 'src/app/resources/services/api.service';
import { GlobalDataModel } from 'src/app/resources/data-model/global-data.model copy';
import { ObjectHelper } from 'src/app/resources/helper/object-helper';
import { BankModel } from 'src/app/resources/data-model/bank.model';
import { Message } from 'primeng/api';
import { CustomValidators } from 'src/app/resources/validators/custom-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionHelper } from 'src/app/resources/helper/session-helper';
import { EmployeeCompleteModel } from 'src/app/resources/data-model/employee-complete.model';
import { StatusPtkpModel } from 'src/app/resources/data-model/status-ptkp.model';
import { UiBlockService } from 'src/app/resources/components/ui-block/ui-block.service';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.scss'],
  providers: [MessageService]

})
export class EmployeeInputComponent implements OnInit {
  public messages!: Message[];
  public selectedEmployee: EmployeeCompleteModel | any = null;
  public items: MenuItem[] = [];
  public activeIndex: number = 0;
  public dataPribadiForm!: FormGroup;
  public dataKepegawaianForm!: FormGroup;
  public showInputContractDate:boolean = false;
  public jenisKelaminList: GenderModel[] = [];
  public agamaList: AgamaModel[] = [];
  public statusPernikahanList: StatusPernihanModel[] = [];
  public statusPtkpList: StatusPtkpModel[] = [];
  public statusKepegawaianList: StatusKepegawaianModel[] = [];
  public departemenList: GlobalDataModel[] = [];
  public bankList: BankModel[] = [];
  public provinsiList: GlobalDataModel[] = [];
  public kabupatenList: GlobalDataModel[] = [];
  public kecamatanList: GlobalDataModel[] = [];
  public kelurahanList: GlobalDataModel[] = [];

  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private employeeService: EmployeeService,
    private uiBlockService: UiBlockService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private messageService: MessageService) {

      this.initJenisKelamin();
      this.initAgama();
      this.initStatusPernikahan();
      this.initStatusPtkp();
      this.initStatusKepegawaian();
      this.initDepartemen();
      this.initProvinsi();
      this.initBank();

    }

  ngOnInit() {
    this.initForm();
    this.items = [
      {
          label: 'Data pribadi',
      },
      {
          label: 'Data kepegawaian',
          command: (event: any) => this.gotoNextTab()
      },
    ];


    this.patchValueFromBrowse();
  }

  public initForm(){
    this.dataPribadiForm = this.fb.group({
      nik: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: '',
      countryBirth: [null, Validators.required],
      gender: [null, Validators.required],
      birthDate: [null, Validators.required],
      marriageStatus: [null, Validators.required],
      identityNumber: [null, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(16)])],
      ptkpStatus: [null, Validators.required],
      telpNumber: null,
      hanphoneNumber: [null, Validators.required],
      email: [null, Validators.compose([CustomValidators.email, Validators.required])],
      agama: [null, Validators.required],
      isDiffDomicili: false,
      idAddress: null,
      idProvinsi: null,
      idKabupaten: null,
      idKecamatan: null,
      idKelurahan: null,
      domiciliAddress: null,
      domiciliProvinsi: null,
      domiciliKabupaten: null,
      domiciliKecamatan: null,
      domiciliKelurahan: null,
    });

    this.dataKepegawaianForm = this.fb.group({
      basicSalary: [0, Validators.required],
      employeeStatus: [null, Validators.required],
      departement: [null, Validators.required],
      position: [null, Validators.required],
      startWorkingDate: [ new Date(), Validators.required],
      startContractDate: null,
      endContractDate: null,
      bankRekening: [null, Validators.required],
      namaRekening: [null, Validators.required],
      nomorRekening: [null, Validators.required],
    })
  }

  public patchValueFromBrowse(){
    this.selectedEmployee = SessionHelper.getItem('EMPLOYEE_FROM_BROWSE');
    console.log('url =>', this.router.url, this.selectedEmployee);

    this.uiBlockService.showUiBlock();
    setTimeout(() => {
      if (!this.router.url.includes('employee/input')) {
        if(!ObjectHelper.isEmpty(this.selectedEmployee)){
        
          this.dataPribadiForm.patchValue(this.selectedEmployee);
          this.dataKepegawaianForm.patchValue(this.selectedEmployee);
    
          // patch value untuk data dengan form input berjenis dropdown
          var findMariageStatus = this.statusPernikahanList.find(x=> x.nama == this.selectedEmployee.marriageStatus);
          var findGender = this.jenisKelaminList.find(x=> x.nama == this.selectedEmployee.gender);
          var findPtkpStatus = this.statusPtkpList.find(x=> x.code == this.selectedEmployee.ptkpStatus);
          var findAgama = this.agamaList.find(x=> x.nama == this.selectedEmployee.agama);
          
          var findEmployeeStatus = this.statusKepegawaianList.find(x=> x.nama == this.selectedEmployee.employeeStatus);
          var findDepartemen = this.departemenList.find(x=> x.nama == this.selectedEmployee.departement);
          var findBank = this.bankList.find(x=> x.code == this.selectedEmployee.bankRekening);
  
  
          console.log('patchValue | findMariageStatus ===>', findMariageStatus)
          console.log('patchValue | findGender ===>', findGender)
          console.log('patchValue | findPtkpStatus ===>', findPtkpStatus)
          console.log('patchValue | findAgama ===>', findAgama)
          console.log('patchValue | findEmployeeStatus ===>', findEmployeeStatus)
          console.log('patchValue | findDepartemen ===>', findDepartemen)
          console.log('patchValue | findBank ===>', findBank)
          
          this.dataPribadiForm.patchValue({
            marriageStatus: findMariageStatus,
            gender: findGender,
            ptkpStatus: findPtkpStatus,
            agama: findAgama
          });
    
          this.dataKepegawaianForm.patchValue({
            employeeStatus: findEmployeeStatus,
            departement: findDepartemen,
            bankRekening: findBank,
          });
        }
      }
      this.uiBlockService.hideUiBlock();
    }, 500);
  }

  public onStatusKepegawaianChange(event: any){
    if(!ObjectHelper.isEmpty(event.value)){
      if(event.value.nama.toLocaleLowerCase().match('kontrak')){
        this.showInputContractDate = true;
        this.dataKepegawaianForm.get('startContractDate')?.setValidators([Validators.required]);
        this.dataKepegawaianForm.get('endContractDate')?.setValidators([Validators.required]);
      } else {
        this.showInputContractDate = false;
        this.dataKepegawaianForm.get('startContractDate')?.clearValidators();
        this.dataKepegawaianForm.get('endContractDate')?.clearValidators();
      }
    }else{
      this.showInputContractDate = false;
      this.dataKepegawaianForm.get('startContractDate')?.clearValidators();
      this.dataKepegawaianForm.get('endContractDate')?.clearValidators();
    }
  }

  public onProvinsiChange(event:any){
    this.dataPribadiForm.patchValue({
      idKabupaten: null,
      idKecamatan: null,
      idKelurahan: null,
    });
    this.kabupatenList = [];
    this.kecamatanList = [];
    this.kelurahanList = [];

    if(!ObjectHelper.isEmpty(event.value)){
      this.getKabupaten(event.value.id)
    }
  }

  public onKabupatenChange(event:any){
    this.dataPribadiForm.patchValue({
      idKecamatan: null,
      idKelurahan: null,
    });
    this.kecamatanList = [];
    this.kelurahanList = [];

    if(!ObjectHelper.isEmpty(event.value)){
      this.getKecamatan(event.value.id)
    }
  }

  public initBank(){
    this.api.getBank().subscribe(res => {
      this.bankList = res;
    });
  }


  public onKecamatanChange(event:any){    
    this.dataPribadiForm.patchValue({
      idKelurahan: null,
    });
    this.kelurahanList = [];

    if(!ObjectHelper.isEmpty(event.value)){
      this.getKelurahan(event.value.id)
    }
  }


  public initProvinsi(){
    this.api.getProvinsi().subscribe(res => {
      this.provinsiList = res;
    });
  }

  public getKabupaten(code:string){
    this.api.getKabupaten(code).subscribe(res => {
      this.kabupatenList = res;
    });
  }

  public getKecamatan(code:string){
    this.api.getKecamatan(code).subscribe(res => {
      this.kecamatanList = res;
    });
  }

  public getKelurahan(code:string){
    this.api.getKelurahan(code).subscribe(res => {
      this.kelurahanList = res;
    });
  }

  public initStatusPtkp(){
    this.fakeService.getStatusPtkp()
      .subscribe((result: any) => {
        this.statusPtkpList = result.data;
    });
  }

  public initStatusPernikahan(){
    this.fakeService.getStatusPernikahan()
      .subscribe((result: any) => {
        this.statusPernikahanList = result.data;
    });
  }

  public initStatusKepegawaian(){
    this.fakeService.getStatusKepegawaian()
      .subscribe((result: any) => {
        this.statusKepegawaianList = result.data;
    });
  }

  public initJenisKelamin(){
    this.fakeService.getJenisKelamin()
      .subscribe((result: any) => {
        this.jenisKelaminList = result.data;
    });
  }

  public initAgama(){
    this.fakeService.getAgama()
      .subscribe((result: any) => {
        this.agamaList = result.data;
    });
  }

  public initDepartemen(){
    this.fakeService.getDepartemen()
      .subscribe((result: any) => {
        this.departemenList = result.data;
    });
  }

  public onActiveIndexChange(event:any) {
      this.activeIndex = event;
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.dataPribadiForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log('invalid inputForm ===>',invalid)

    return invalid;
}


  public simpan(){
    
    console.log('simpan ===>', this.dataPribadiForm.getRawValue(), this.dataKepegawaianForm.getRawValue());

    // gabungin data pribadi dengan data kepegawaian sebagai basis data yang komplit untuk di simpan
    var mergedData = Object.assign(this.dataPribadiForm.getRawValue(),this.dataKepegawaianForm.getRawValue());
    mergedData.agama = ObjectHelper.isEmpty(this.dataPribadiForm.value.agama)? null : this.dataPribadiForm.value.agama.nama;
    mergedData.marriageStatus = ObjectHelper.isEmpty(this.dataPribadiForm.value.marriageStatus)? null : this.dataPribadiForm.value.marriageStatus.nama;
    mergedData.gender = ObjectHelper.isEmpty(this.dataPribadiForm.value.gender)? null : this.dataPribadiForm.value.gender.nama;
    mergedData.ptkpStatus = ObjectHelper.isEmpty(this.dataPribadiForm.value.ptkpStatus)? null : this.dataPribadiForm.value.ptkpStatus.code;
    mergedData.employeeStatus = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.employeeStatus)? null : this.dataKepegawaianForm.value.employeeStatus.nama;
    mergedData.departement = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.departement)? null : this.dataKepegawaianForm.value.departement.nama;
    mergedData.bankRekening = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.bankRekening)? null : this.dataKepegawaianForm.value.bankRekening.code;
    mergedData.id = ObjectHelper.isEmpty(this.selectedEmployee)? null : this.selectedEmployee.id;
    var saveEmployee = new EmployeeCompleteModel(mergedData);
    

    if(ObjectHelper.isEmpty(this.selectedEmployee)){
      var create = this.employeeService.createEmployee(saveEmployee);
      if(!ObjectHelper.isEmpty(create)){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil dibuat' });
        this.batal();
      }
      console.log('create employee ===>', create);
    }else{
      var edit = this.employeeService.editEmployee(saveEmployee);
      if(!ObjectHelper.isEmpty(create)){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil diperbarui' });
        this.batal();
      }
      console.log('edit employee ===>', edit);
    }
    
  }


  public gotoNextTab(){

    this.findInvalidControls();

    if(this.dataPribadiForm.invalid){
      this.messages = [{ 
        severity: 'warn', 
        summary: 'Tidak bisa lanjut ke halaman berikutnya',
        detail: 'Silakan lengkapi data yang wajib diisi(*) untuk bisa melanjutkan ke halaman berikutnya'
      }];
      this.activeIndex = 0
    }else{
      this.activeIndex = 1;
    }
  }

  public batal(){
    SessionHelper.destroy('EMPLOYEE_FROM_BROWSE');
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
