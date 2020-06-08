import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../../services/database.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add-lector-rfid.component.html',
  styleUrls: ['./add-lector-rfid.component.css']
})
export class AddLectorRfidComponent implements OnInit {

  idLector: string;
  lector = {
    idLector: undefined,
    alias: undefined
  };

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idLector = this.route.snapshot.params.readerId;
    console.log(this.idLector, this.lector);
    if (this.idLector) {
      this.db.getLectorRfid(this.idLector).subscribe(l => {
        const data = (l as any).data.lectorRFID[0];
        this.lector.idLector = data.idLector;
        this.lector.alias = data.aliasDispositivo;
      });
    }
  }

  submit() {
    console.log(this.idLector, this.lector);
    if (this.idLector) {
      this.db.setLectorRfid(this.lector, this.idLector).subscribe(() => {
        this.router.navigateByUrl('/admin/rfid-readers');
      });
    } else {
      this.db.createLectorRfid(this.lector).subscribe(() => {
        this.router.navigateByUrl('/admin/rfid-readers');
      });
    }
  }

}
