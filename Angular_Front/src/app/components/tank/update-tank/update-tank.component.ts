import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css']
})
export class UpdateTankComponent implements OnInit {
  tank: string;

  constructor(
    route: ActivatedRoute,
    private user: UserService,
    private router: Router
  ) { 
    this.tank = route.snapshot.params.id;
  }

  ngOnInit(): void {
  }
  onUpdateTank(event){
    const userType = this.user.getType();
    this.router.navigateByUrl(`/${userType}/reports/inventory`);
  }

}
