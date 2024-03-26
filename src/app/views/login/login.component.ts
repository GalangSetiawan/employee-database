import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/app/resources/fake.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fakeService: FakeService) { }

  ngOnInit() {
    this.fakeService.getFakeLoginCredential()
      .subscribe((result: any) => {
        console.log('data ===>',result)
    });
  }

}
