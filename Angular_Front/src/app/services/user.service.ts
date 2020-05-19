import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  type = 'admin';

  constructor() { }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

}
