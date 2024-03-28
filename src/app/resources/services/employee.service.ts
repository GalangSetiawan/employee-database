import { Injectable } from '@angular/core';
import { employeeList } from "../fake-data/employee";
import { EmployeeCompleteModel } from '../data-model/employee-complete.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmployeeService {

  public employee: EmployeeCompleteModel | any = null;
  public employeeList: EmployeeCompleteModel[] = employeeList;
  constructor() { }



  public getEmployeeById(id:string) {
    this.employee = this.employeeList.find(emp => emp.id === id);
    return this.employee = this.employeeList.find(emp => emp.id === id);
  }

  public getAllEmployee(){
    var allEmployee = this.employeeList;
    allEmployee.forEach(emp => {
        emp.fullName = emp.firstName +  " " + emp.lastName;
    });
    return allEmployee;
  }

  public createEmployee(data:EmployeeCompleteModel){
    data.id = uuidv4();
    this.employeeList.push(data);
    return this.getEmployeeById(data.id);
  }

  public editEmployee(data:EmployeeCompleteModel){
    this.employeeList = this.getAllEmployee();
    console.log('editEmployee data===>',data)

    console.log('editEmployee all employee ===>',this.employeeList)


    var findIdx = this.employeeList.findIndex(emp => emp.id === data.id);
    console.log('editEmployee ===>',findIdx)
    if(findIdx != -1) {
      this.employeeList[findIdx] = data; 
      return data;
    }
    return null;
  }

  public deleteEmployee(id: string){
    var findIdx = this.employeeList.findIndex(emp => emp.id === id);
    if(findIdx != -1) {
      this.employeeList.splice(findIdx, 1);
      return true;
    }else return false
  }


}