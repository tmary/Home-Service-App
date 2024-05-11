import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatProgressSpinnerModule ,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password : string = '';
  errorMessage: string = '';
  isLoading = false;



  constructor(private fb: FormBuilder,private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  login(): void {
    this.isLoading = true;
    setTimeout(() => {
      if ( this.email && this.password) {
        this.errorMessage = '';
        this.authService.login(this.email, this.password).subscribe({
          next:(data) => {
            if(data) {
              console.log(data);
              this.isLoading = false;
              const username = '';
              this.router.navigate(['/homepage'], { queryParams: { username: username}});
            }
          }, error:(err) => {
            console.log(err);
            this.isLoading = false;
          },
        })
    } else {
      this.isLoading = false;
      this.errorMessage = 'Form is blank.';
    }
    }, 1500);
  }



  navigate(route:string): void{
    this.router.navigate([route]);
  }
  openRegistrationPage(){
    this.router.navigateByUrl("/signup");
  }

}
