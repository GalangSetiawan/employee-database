import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/services/fake.service';
import { EmployeeService } from 'src/app/resources/services/employee.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
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
  providers: [ConfirmationService, MessageService]

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
  public screenMode = 'input;'

  public maxDate: Date = new Date();

  public provinsiList: GlobalDataModel[] = [];
  public kabupatenList: GlobalDataModel[] = [];
  public kecamatanList: GlobalDataModel[] = [];
  public kelurahanList: GlobalDataModel[] = [];

  public provinsiDomisiliList: GlobalDataModel[] = [];
  public kabupatenDomisiliList: GlobalDataModel[] = [];
  public kecamatanDomisiliList: GlobalDataModel[] = [];
  public kelurahanDomisiliList: GlobalDataModel[] = [];

  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService, 
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
    this.saveDraftOnLocale();
  }

  public saveDraftOnLocale(){

    if (this.router.url.includes('employee/input')) {
      this.confirmUseDraftAsCurrentInput();

      setInterval(
        () => {
          SessionHelper.setItem('DRAFT_INPUT_KARYAWAN_DATA_KEPEGAWAIAN', this.dataKepegawaianForm.getRawValue());
          SessionHelper.setItem('DRAFT_INPUT_KARYAWAN_DATA_PRIBADI', this.dataPribadiForm.getRawValue());
        }, 1000
      );
    }
  }

  public confirmUseDraftAsCurrentInput(){

    var isExistInputDraftDataKepegawaian = SessionHelper.getItemAndDestroy('DRAFT_INPUT_KARYAWAN_DATA_KEPEGAWAIAN');
    var isExistInputDraftDataPribadi = SessionHelper.getItemAndDestroy('DRAFT_INPUT_KARYAWAN_DATA_PRIBADI');

    if(!ObjectHelper.isEmpty(isExistInputDraftDataKepegawaian)){
      this.confirmationService.confirm({
        message: 'Apakah Anda ingin melanjutkan pengisian data karyawan dengan data draft yang ada?',
        header: 'Konfirmasi pengisian data',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.dataKepegawaianForm.patchValue(isExistInputDraftDataKepegawaian);
          this.dataPribadiForm.patchValue(isExistInputDraftDataPribadi);
        },
        reject: (type:any) => {
            
        }
      });
    }
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
      if(!ObjectHelper.isEmpty(this.selectedEmployee)){
        this.screenMode = 'edit'
      
        this.dataPribadiForm.patchValue(this.selectedEmployee);
        this.dataKepegawaianForm.patchValue(this.selectedEmployee);
  
        // patch value untuk data dengan form input berjenis dropdown
        var findMariageStatus = this.statusPernikahanList.find(x=> x.nama == this.selectedEmployee.marriageStatus);
        var findGender = this.jenisKelaminList.find(x=> x.nama == this.selectedEmployee.gender);
        var findPtkpStatus = this.statusPtkpList.find(x=> x.code == this.selectedEmployee.ptkpStatus);
        var findAgama = this.agamaList.find(x=> x.nama == this.selectedEmployee.agama);
        
        var findEmployeeStatus = this.statusKepegawaianList.find(x=> x.nama == this.selectedEmployee.employeeStatus);
        var findDepartemen = this.departemenList.find(x=> x.nama == this.selectedEmployee.departement);
        var findBank = this.bankList.find(x=> x.name == this.selectedEmployee.bankRekening);
        

        // cari alamat KTP
        this.getKabupaten(this.selectedEmployee.idProvinsi); 
        this.getKecamatan(this.selectedEmployee.idKabupaten); 
        this.getKelurahan(this.selectedEmployee.idKecamatan); 
        this.getKabupaten(this.selectedEmployee.domiciliProvinsi, true);
        this.getKecamatan(this.selectedEmployee.domiciliKabupaten, true);
        this.getKelurahan(this.selectedEmployee.domiciliKecamatan, true);

        setTimeout(() => {
          var findidProvinsi = this.provinsiList.find(x=> x.id == this.selectedEmployee.idProvinsi);
          var findidKabupaten = this.kabupatenList.find(x=> x.id == this.selectedEmployee.idKabupaten);
          var findidKecamatan = this.kecamatanList.find(x=> x.id == this.selectedEmployee.idKecamatan);
          var findidKelurahan = this.kelurahanList.find(x=> x.id == this.selectedEmployee.idKelurahan);
          var findDomiciliProvinsi = this.provinsiDomisiliList.find(x=> x.id == this.selectedEmployee.domiciliProvinsi);
          var findDomiciliKabupaten = this.kabupatenDomisiliList.find(x=> x.id == this.selectedEmployee.domiciliKabupaten);
          var findDomiciliKecamatan = this.kecamatanDomisiliList.find(x=> x.id == this.selectedEmployee.domiciliKecamatan);
          var findDomiciliKelurahan = this.kelurahanDomisiliList.find(x=> x.id == this.selectedEmployee.domiciliKelurahan);

          this.dataPribadiForm.patchValue({
            idProvinsi: findidProvinsi,
            idKabupaten: findidKabupaten,
            idKecamatan: findidKecamatan,
            idKelurahan: findidKelurahan,
            domiciliProvinsi: findDomiciliProvinsi,
            domiciliKabupaten: findDomiciliKabupaten,
            domiciliKecamatan: findDomiciliKecamatan,
            domiciliKelurahan: findDomiciliKelurahan,
          });
        }, 1000);

        this.dataPribadiForm.patchValue({
          marriageStatus: findMariageStatus,
          gender: findGender,
          ptkpStatus: findPtkpStatus,
          agama: findAgama,
        });
  
        this.dataKepegawaianForm.patchValue({
          employeeStatus: findEmployeeStatus,
          departement: findDepartemen,
          bankRekening: findBank,
        });
      }else{
        this.screenMode = 'input'
      }
      this.uiBlockService.hideUiBlock();
    }, 500);
  }

  public onStatusKepegawaianChange(event: any){
    if(!ObjectHelper.isEmpty(event.value)){
      if(event.value.nama.toLocaleLowerCase().includes('kontrak')){
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

  public onProvinsiChange(event:any, isDomisili = false){
    if(isDomisili){
      this.dataPribadiForm.patchValue({
        domiciliKabupaten: null,
        domiciliKecamatan: null,
        domiciliKelurahan: null,
      });
      this.kabupatenDomisiliList = [];
      this.kecamatanDomisiliList = [];
      this.kelurahanDomisiliList = [];
  
      if(!ObjectHelper.isEmpty(event.value)){
        this.getKabupaten(event.value.id, true)
      }
    }else{
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
  }

  public onKabupatenChange(event:any, isDomisili = false){
    if(isDomisili){
      this.dataPribadiForm.patchValue({
        domiciliKecamatan: null,
        domiciliKelurahan: null,
      });
      this.kecamatanDomisiliList = [];
      this.kelurahanDomisiliList = [];
  
      if(!ObjectHelper.isEmpty(event.value)){
        this.getKecamatan(event.value.id, true)
      }
    }else{
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
    
  }

  public onKecamatanChange(event:any, isDomisili = false){
    if(isDomisili){
      this.dataPribadiForm.patchValue({
        domiciliKelurahan: null,
      });
      this.kelurahanDomisiliList = [];
  
      if(!ObjectHelper.isEmpty(event.value)){
        this.getKelurahan(event.value.id, true)
      }
    } else{
      this.dataPribadiForm.patchValue({
        idKelurahan: null,
      });
      this.kelurahanList = [];
  
      if(!ObjectHelper.isEmpty(event.value)){
        this.getKelurahan(event.value.id)
      }
    } 
  }

  public initProvinsi(){
    this.api.getProvinsi().subscribe(res => {
      this.provinsiList = res;
      this.provinsiDomisiliList = res;
    });
  }

  public getKabupaten(code:string, isDomisili = false){
    if(!ObjectHelper.isEmpty(code)){
      this.api.getKabupaten('kabupaten/'+code).subscribe(res => {
        if(isDomisili) this.kabupatenDomisiliList = res;
        else this.kabupatenList = res;
      });
    }
  }

  public getKecamatan(code:string, isDomisili = false){
    if(!ObjectHelper.isEmpty(code)){
      this.api.getKecamatan('kecamatan/'+code).subscribe(res => {
        if(isDomisili) this.kecamatanDomisiliList = res;
        else this.kecamatanList = res;
      });
    }
  }

  public getKelurahan(code:string, isDomisili = false){
    if(!ObjectHelper.isEmpty(code)){
      this.api.getKelurahan('kelurahan/'+code).subscribe(res => {
        if(isDomisili) this.kelurahanDomisiliList = res;
        else this.kelurahanList = res;
      });
    }
  }

  public initBank(){
    this.api.getBank().subscribe(res => {
      this.bankList = res;
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


  public simpan(){

    SessionHelper.destroy('DRAFT_INPUT_KARYAWAN_DATA_KEPEGAWAIAN');
    SessionHelper.destroy('DRAFT_INPUT_KARYAWAN_DATA_PRIBADI');
    
    console.log('simpan ===>', this.dataPribadiForm.getRawValue(), this.dataKepegawaianForm.getRawValue());

    // gabungin data pribadi dengan data kepegawaian sebagai basis data yang komplit untuk di simpan
    var mergedData = Object.assign(this.dataPribadiForm.getRawValue(),this.dataKepegawaianForm.getRawValue());
    mergedData.agama = ObjectHelper.isEmpty(this.dataPribadiForm.value.agama)? null : this.dataPribadiForm.value.agama.nama;
    mergedData.marriageStatus = ObjectHelper.isEmpty(this.dataPribadiForm.value.marriageStatus)? null : this.dataPribadiForm.value.marriageStatus.nama;
    mergedData.gender = ObjectHelper.isEmpty(this.dataPribadiForm.value.gender)? null : this.dataPribadiForm.value.gender.nama;
    mergedData.ptkpStatus = ObjectHelper.isEmpty(this.dataPribadiForm.value.ptkpStatus)? null : this.dataPribadiForm.value.ptkpStatus.code;
    mergedData.employeeStatus = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.employeeStatus)? null : this.dataKepegawaianForm.value.employeeStatus.nama;
    mergedData.departement = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.departement)? null : this.dataKepegawaianForm.value.departement.nama;
    mergedData.bankRekening = ObjectHelper.isEmpty(this.dataKepegawaianForm.value.bankRekening)? null : this.dataKepegawaianForm.value.bankRekening.name;
    mergedData.idProvinsi = ObjectHelper.isEmpty(this.dataPribadiForm.value.idProvinsi)? null : this.dataPribadiForm.value.idProvinsi.id;
    mergedData.idKabupaten = ObjectHelper.isEmpty(this.dataPribadiForm.value.idKabupaten)? null : this.dataPribadiForm.value.idKabupaten.id;
    mergedData.idKecamatan = ObjectHelper.isEmpty(this.dataPribadiForm.value.idKecamatan)? null : this.dataPribadiForm.value.idKecamatan.id;
    mergedData.idKelurahan = ObjectHelper.isEmpty(this.dataPribadiForm.value.idKelurahan)? null : this.dataPribadiForm.value.idKelurahan.id;
    mergedData.domiciliProvinsi = ObjectHelper.isEmpty(this.dataPribadiForm.value.domiciliProvinsi)? null : this.dataPribadiForm.value.domiciliProvinsi.id;
    mergedData.domiciliKabupaten = ObjectHelper.isEmpty(this.dataPribadiForm.value.domiciliKabupaten)? null : this.dataPribadiForm.value.domiciliKabupaten.id;
    mergedData.domiciliKecamatan = ObjectHelper.isEmpty(this.dataPribadiForm.value.domiciliKecamatan)? null : this.dataPribadiForm.value.domiciliKecamatan.id;
    mergedData.domiciliKelurahan = ObjectHelper.isEmpty(this.dataPribadiForm.value.domiciliKelurahan)? null : this.dataPribadiForm.value.domiciliKelurahan.id;

    mergedData.id = ObjectHelper.isEmpty(this.selectedEmployee)? null : this.selectedEmployee.id;
    var saveEmployee = new EmployeeCompleteModel(mergedData);
    

    if(ObjectHelper.isEmpty(this.selectedEmployee)){
      var create = this.employeeService.createEmployee(saveEmployee);
      if(!ObjectHelper.isEmpty(create)){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil dibuat' });
        this.batal();
      }
    }else{
      var edit = this.employeeService.editEmployee(saveEmployee);
      if(!ObjectHelper.isEmpty(create)){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil diperbarui' });
        this.batal();
      }
    }  
  }


  public gotoNextTab(){

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
    SessionHelper.destroy('DRAFT_INPUT_KARYAWAN_DATA_KEPEGAWAIAN');
    SessionHelper.destroy('DRAFT_INPUT_KARYAWAN_DATA_PRIBADI');
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
