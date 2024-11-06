import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nama = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.nama = this.authService.nama;
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
