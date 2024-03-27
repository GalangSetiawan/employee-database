import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/resources/data-model/employee.model';
import { FakeService } from 'src/app/resources/services/fake.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObjectHelper } from 'src/app/resources/helper/object-helper';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

  public employeeList: EmployeeModel[] = [];
  public filteredEmployee: EmployeeModel[] = [];
  public filterForm!: FormGroup;
  public first = 0;
  public rows = 10;

  constructor(
    private fb: FormBuilder,
    private fakeService: FakeService,
    private router: Router,

  ) { 
    this.initForm();
  }


  ngOnInit(): void {
    this.getFakeEmployee();
  }

  private initForm() {
    this.filterForm = this.fb.group({
      nama: null,
      email: null,
    });
  }

  public getFakeEmployee(){
  
    this.fakeService.getFakeEmployee()
      .subscribe((result: any) => {
        this.employeeList = result.data[0];
        this.employeeList.forEach(employee => {
          employee.fullName = employee.firstName + ' ' + employee.lastName;
        });

        this.filteredEmployee = this.employeeList;
    });
    
  }

  public input(){
    this.router.navigate(['/employee/input']);
  }

  public search() {

    var filterNama = this.filterForm.value.nama;
    var filterEmail = this.filterForm.value.email;

    this.filteredEmployee = this.employeeList;

    if(!ObjectHelper.isEmpty(filterNama)){
      this.filteredEmployee = this.filteredEmployee.filter( x=>
        x.fullName.toLocaleLowerCase().match(filterNama)
      )
    }

    if(!ObjectHelper.isEmpty(filterEmail)){
      this.filteredEmployee = this.filteredEmployee.filter( x=>
      x.email.toLocaleLowerCase().match(filterEmail)  
      )
    }

    
    console.log('search ==>',this.filterForm.value.nama, this.filteredEmployee)

  }

  public next() {
    this.first = this.first + this.rows;
  }

  public prev() {
      this.first = this.first - this.rows;
  }

  public reset() {
      this.first = 0;
  }

  public pageChange(event:any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  public isLastPage(): boolean {
      return this.filteredEmployee ? this.first === this.filteredEmployee.length - this.rows : true;
  }

  public isFirstPage(): boolean {
      return this.filteredEmployee ? this.first === 0 : true;
  }

}
