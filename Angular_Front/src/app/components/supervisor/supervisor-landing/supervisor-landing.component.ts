import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-supervisor-landing',
  templateUrl: './supervisor-landing.component.html',
  styleUrls: ['./supervisor-landing.component.css']
})
export class SupervisorLandingComponent implements OnInit {

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
