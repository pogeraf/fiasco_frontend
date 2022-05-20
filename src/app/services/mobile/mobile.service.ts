import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  public isMobile: boolean = window.innerWidth < 600;

  private mobileSource = new BehaviorSubject<boolean>(this.isMobile);
  public isMobile$ = this.mobileSource.asObservable();
  constructor() {}
}
