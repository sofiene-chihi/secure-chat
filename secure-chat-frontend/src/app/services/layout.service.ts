import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  mobileScreen():boolean{
    return window.innerWidth<800;
  }
}
