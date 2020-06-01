import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/User';
import {DatabaseService} from '../../../services/database.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  id: string;
  constructor(
    private db: DatabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if(this.id){
      this.db.getUser(this.id).subscribe(result => {
        const res = result as any;
        this.user = res.data.usuario;
        console.log(this.user);
      })
    }
  }

}
