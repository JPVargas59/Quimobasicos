import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/app/models/Lugar';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  lugar: Lugar;
  id: string;

  constructor(
    private db: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.location;
    if(this.id) {
      this.db.getLugar(this.id).subscribe(result => {
        const res = result as any;
        this.lugar = res.data.lugar;
      })
    }
  }a

}
