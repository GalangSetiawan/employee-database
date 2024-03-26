import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/resources/data-model/employee.model';
import { FakeService } from 'src/app/resources/fake.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit{

  public employeeList: EmployeeModel[] = [];

  constructor(
    private fakeService: FakeService
  ) { 

  }


  ngOnInit(): void {
    this.generateDummyEmployee();
  }

  public getFakeEmployee(){
  
    this.fakeService.getFakeEmployee()
      .subscribe((result: any) => {
        result.data.forEach((data: EmployeeModel) => {
          var eachData = new EmployeeModel(data)
          this.employeeList.push(eachData)
        });
        console.log('employeeList ===>',this.employeeList)
    });
    
  }


  public generateDummyEmployee(){
    this.employeeList = [];
    var randomDataLength = Math.floor(Math.random() * 60) + 1;
    for(var i = 0; i<randomDataLength;i++){


      var data = new EmployeeModel({
        id : String((new Date).getTime()+i),


        username: 'ID-DATA-KRYWN-00'+i,
        firstName: 'ID-DATA-KRYWN-00'+i,
        lastName: 'ID-DATA-KRYWN-00'+i,
        email: 'ID-DATA-KRYWN-00'+i,
        birthDate: new Date(),
        basicSalary: 55555,
        status: 'ID-DATA-KRYWN-00'+i,
        group: 'ID-DATA-KRYWN-00'+i,
        description: 'ID-DATA-KRYWN-00'+i,
      })
      this.employeeList.push(data);
    }
  }
}
