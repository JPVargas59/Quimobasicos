import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit {
  places: any;
  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.db.getLugares().subscribe(result => {
      const places = result as any;
      this.places = places.data.lugares;
    })
  }
}
