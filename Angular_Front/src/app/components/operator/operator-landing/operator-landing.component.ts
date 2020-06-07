import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-operator-landing',
  templateUrl: './operator-landing.component.html',
  styleUrls: ['./operator-landing.component.css']
})
export class OperatorLandingComponent implements OnInit {

  search: string;
  constructor(
    private user: UserService
  ) { }

  ngOnInit(): void {
  }

  searchTank() {
    if (this.search) {
      this.user.goTo(`tank/${this.search}`);
    }
  }

}
