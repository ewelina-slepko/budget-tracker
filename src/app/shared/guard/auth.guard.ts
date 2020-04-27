import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate = (): Observable<boolean> =>
    this.authService.isAuthenticated().pipe(
      tap(user => {
        if (!user) {
          this.router.navigate(['auth/signin']);
        }
        this.authService.currentUser = user;
      }),
      map(user => !!user),
    )
}
