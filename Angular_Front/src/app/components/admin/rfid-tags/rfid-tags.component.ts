import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rfid-tags',
  templateUrl: './rfid-tags.component.html',
  styleUrls: ['./rfid-tags.component.css']
})
export class RfidTagsComponent implements OnInit {
  tags: any;
  constructor(
    private db: DatabaseService,
    private router: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.db.getEtiquetas().subscribe(result => {
      const tags = result as any;
      this.tags = tags.data.etiquetas;
    })
  }

  onTagSelect(event){
    const id = event.target.id;
    this.router.navigateByUrl(`/admin/rfid-tags/${id}/edit`);
  }

  selectTank(id) {
    console.log(id)
    if(id){
      this.router.navigateByUrl(`/${this.user.getType()}/tank/${id}`);
    }
  }
}
