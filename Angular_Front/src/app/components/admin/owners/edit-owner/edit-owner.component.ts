import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { Owner } from 'src/app/models/owner';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  id: string;
  owner: Owner;

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.ownerId;
    if(this.id) {
      this.db.getDueno(this.id).subscribe(res =>{
        const owner = res as any;
        this.owner = owner.data.owner;
      })
    }
  }
}
