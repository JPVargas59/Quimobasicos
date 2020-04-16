import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: string;

  constructor(route: ActivatedRoute) {
    this.user = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }

}
