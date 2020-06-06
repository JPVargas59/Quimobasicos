import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operator-home',
  templateUrl: './operator-home.component.html',
  styleUrls: ['./operator-home.component.css']
})
export class OperatorHomeComponent implements OnInit {

  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.user.logout()
  }
}
