import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/fake.service';

@Component({
  selector: 'app-employee-input',
  templateUrl: './employee-input.component.html',
  styleUrls: ['./employee-input.component.scss']
})
export class EmployeeInputComponent implements OnInit {

  constructor(private fakeService: FakeService) { }

  ngOnInit() {
    
  }

}
