import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-supervisor-home',
  templateUrl: './supervisor-home.component.html',
  styleUrls: ['./supervisor-home.component.css']
})
export class SupervisorHomeComponent implements OnInit {

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.user.logout()
  }

}
