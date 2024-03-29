import { Component, OnInit } from '@angular/core';
import { FakeService } from './resources/services/fake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'employee-database';
  public isLoggedIn = false;

  constructor(
    private fakeService: FakeService,
  ) { 
  }

  ngOnInit(): void {
  }

}
