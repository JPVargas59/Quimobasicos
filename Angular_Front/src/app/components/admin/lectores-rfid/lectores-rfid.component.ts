import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../../../services/database.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lectores-rfid',
  templateUrl: './lectores-rfid.component.html',
  styleUrls: ['./lectores-rfid.component.css']
})
export class LectoresRfidComponent implements OnInit {

  lectores: any;


  constructor(
    private user: UserService,
    private router: Router,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.db.getLectoresRfid().subscribe(lectores => {
      this.lectores = (lectores as any).data.lectorRFID;
      // console.log(this.lectores);
    });
  }

  disableToken(id) {
    this.db.disableToken(id).subscribe(() => {
      alert('Token desactivado con éxito');
    });
  }

  generateToken(id) {
    this.db.genToken(id).subscribe((r) => {
      // console.log(r);
      const token = (r as any).data.genTokenLector;
      alert(`Token para lector: \n ${token}`);
    });
  }
  goToNewReader() {
    this.router.navigateByUrl(`/${this.user.getType()}/rfid-readers/add`);
  }

}
