import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: any;
  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.db.getDuenos().subscribe(result => {
      const owners = result as any;
      this.owners = owners.data.owners;
    })
  }
  onOwnerSelect(event) {
    const id = event.target.id;
    this.router.navigateByUrl(`/admin/owners/${id}/edit`);
  }

}
