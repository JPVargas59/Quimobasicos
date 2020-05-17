import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  type: string;

  constructor() { }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

}
