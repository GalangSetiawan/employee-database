import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/services/fake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectHelper } from 'src/app/resources/helper/object-helper';
import { EmployeeCompleteModel } from 'src/app/resources/data-model/employee-complete.model';
import { SessionHelper } from 'src/app/resources/helper/session-helper';
import { UiBlockService } from 'src/app/resources/components/ui-block/ui-block.service';
import { StatusKepegawaianModel } from 'src/app/resources/data-model/status-kepegawaian.model';
import { GlobalDataModel } from 'src/app/resources/data-model/global-data.model copy';
import { ConfirmationService, MessageService, ConfirmEventType  } from 'primeng/api';
import { EmployeeService } from 'src/app/resources/services/employee.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class EmployeeComponent implements OnInit{

  public employeeList: EmployeeCompleteModel[] = [];
  public filteredEmployee: EmployeeCompleteModel[] = [];
  public filterForm!: FormGroup;
  public statusKepegawaianList: StatusKepegawaianModel[] = [];
  public departemenList: GlobalDataModel[] = [];
  public currentPageItem: EmployeeCompleteModel[] = [];
  public arrPagination:any = []
  public showingMaxDataInOnePage = {value: 10} ;
  public arrShowingMaxData = [{value: 5},{value: 10},{value: 20},{value: 50},{value: 100}]
  public first = 0;
  public page: number = 1;

  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiBlockService: UiBlockService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService


  ) { 
    this.initForm();
  }


  ngOnInit(): void {
    this.getFakeEmployee();
    this.initDepartemen();
    this.initStatusKepegawaian();

    this.pagination(1);
    this.restoreFilterSearchParameter();


  }

  private initForm() {
    this.filterForm = this.fb.group({
      nik: null,
      fullName: null,
      departement: null,
      position: null,
      employeeStatus: null,
      showCardView: true,
      currentPage: 1
    });
  }

  public restoreFilterSearchParameter(){
    var filterBrowseSaved = SessionHelper.getItemAndDestroy('FILTER_BROWSE');
    if(!ObjectHelper.isEmpty(filterBrowseSaved)){
      this.filterForm.patchValue(filterBrowseSaved);

      this.search(this.filterForm.value.currentPage);
    }
  }

  public paginate(event: any) {
    this.first = event.first;
    this.page = event.first / event.rows + 1;
  }

  public initDepartemen(){
    this.fakeService.getDepartemen()
      .subscribe((result: any) => {
        this.departemenList = result.data;
    });
  }

  public initStatusKepegawaian(){
    this.fakeService.getStatusKepegawaian()
      .subscribe((result: any) => {
        this.statusKepegawaianList = result.data;
    });
  }

  public getFakeEmployee(){
  
    this.employeeList = this.employeeService.getAllEmployee();
    this.filteredEmployee = this.employeeList;
  
  }

  public input(){
    this.router.navigate(['/employee/input']);
    SessionHelper.setItem('FILTER_BROWSE', this.filterForm.value);
  }

  public edit(rowData: EmployeeCompleteModel){
    console.log("edit ==>", rowData)
    SessionHelper.setItem('EMPLOYEE_FROM_BROWSE', rowData);
    SessionHelper.setItem('FILTER_BROWSE', this.filterForm.value);
    this.router.navigate(['./edit'], { relativeTo: this.activatedRoute }); 
  }

  public lihatDetail(rowData: EmployeeCompleteModel){
    console.log("lihatDetail ==>", rowData)
    SessionHelper.setItem('EMPLOYEE_FROM_BROWSE', rowData);
    SessionHelper.setItem('FILTER_BROWSE', this.filterForm.value);
    this.router.navigate(['./view'], { relativeTo: this.activatedRoute }); 
  }

  public pagination(page:any){
    this.filterForm.patchValue({ currentPage: page});
    this.arrPagination = [];
    this.currentPageItem = [];
    var itemInPage = this.showingMaxDataInOnePage.value;
    var arr = this.filteredEmployee;
    this.arrPagination = arr.map( function(e,i){ 
        return i%itemInPage===0 ? arr.slice(i,i+itemInPage) : null; 
    }).filter(function(e){ return e; });

    this.currentPageItem = this.arrPagination[parseInt(page)-1]
  }

  public prevPage(){
    if(this.filterForm.value.currentPage == 1){
      this.filterForm.patchValue({ currentPage: 1});
    } else {
      this.filterForm.patchValue({ currentPage: this.filterForm.value.currentPage -= 1 })
    }
    this.pagination(this.filterForm.value.currentPage);
  }
  
  public nextPage(){
    if(this.filterForm.value.currentPage == this.arrPagination.length){
      this.filterForm.patchValue({ currentPage: this.arrPagination.length });  
    } else{
      this.filterForm.patchValue({ currentPage: this.filterForm.value.currentPage += 1 })
    }
    this.pagination(this.filterForm.value.currentPage);
  }

  
  public search(currentPage = 1) {
    this.uiBlockService.showUiBlock();
    setTimeout(() => {

      var filterNik = this.filterForm.value.nik;
      var filterFullName = this.filterForm.value.fullName;
      var filterJabatan = this.filterForm.value.position;
      var filterDepartemen = ObjectHelper.isEmpty(this.filterForm.value.departement)? null : this.filterForm.value.departement.nama;
      var filterStatusKepegawaian = ObjectHelper.isEmpty(this.filterForm.value.employeeStatus)? null : this.filterForm.value.employeeStatus.nama;

      this.filteredEmployee = this.employeeList;

      if(!ObjectHelper.isEmpty(filterNik)){
        this.filteredEmployee = this.filteredEmployee.filter( x=> x.nik.toLowerCase().includes(filterNik.toLowerCase()));
      }

      if(!ObjectHelper.isEmpty(filterFullName)){
        this.filteredEmployee = this.filteredEmployee.filter( x=> x.fullName.toLowerCase().includes(filterFullName.toLowerCase()));
      }

      if(!ObjectHelper.isEmpty(filterJabatan)){
        this.filteredEmployee = this.filteredEmployee.filter( x=> x.position.toLowerCase().includes(filterJabatan.toLowerCase()));
      }

      if(!ObjectHelper.isEmpty(filterDepartemen)){
        this.filteredEmployee = this.filteredEmployee.filter( x=> x.departement.includes(filterDepartemen));
      }

      if(!ObjectHelper.isEmpty(filterStatusKepegawaian)){
        this.filteredEmployee = this.filteredEmployee.filter( x=> x.employeeStatus.includes(filterStatusKepegawaian));
      }

      this.pagination(currentPage);

      this.uiBlockService.hideUiBlock();
    }, 500);

  }

  public confirmDelete(rowData: EmployeeCompleteModel){
    this.confirmationService.confirm({
        message: 'Apakah Anda yakin ingin menghapus data karyawan <b>' + rowData.fullName +'</b>?',
        header: 'Konfirmasi Hapus data',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.delete(rowData);
        },
        reject: (type:any) => {
            
        }
    });
  }

  public delete(rowData: EmployeeCompleteModel){

    var findIdxData: any = this.employeeList.find(x=> x.id == rowData.id);
    if(!ObjectHelper.isEmpty(findIdxData)){
      this.employeeList.splice(findIdxData,1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil dihapus' });

      // this.search();
    }

  }

}
