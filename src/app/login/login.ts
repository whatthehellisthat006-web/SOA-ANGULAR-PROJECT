import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login implements OnInit {
  user = new User();
  erreur = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLoggedin(): void {
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) {
      this.erreur = 0;
      this.router.navigate(['/']);
    } else {
      this.erreur = 1;
    }
  }
}
