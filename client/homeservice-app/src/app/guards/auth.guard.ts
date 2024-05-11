import { CanActivate , Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable} from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { UserRole } from '../shared/user-role.enum';
import { Observable } from 'rxjs';


export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthAndRole();
  }

 private checkAuthAndRole(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      const currentUserRole = this.authService.getCurrentUserRole();
      if (currentUserRole === UserRole.Admin) {
        return true;
      } else {
        this.router.navigateByUrl('/unauthorized');
        return false;
      }
    }
  };
}
