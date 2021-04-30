import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  public isOrg = false;
  profileImage = "";
  registerForm = new FormGroup(
    {
      name : new FormControl("", Validators.required),
      email : new FormControl("", [Validators.email, Validators.required]),
      address : new FormControl("", Validators.required),
      website : new FormControl(""),
      phone : new FormControl("", Validators.required),
      image : new FormControl(""),
      password : new FormControl("", [Validators.required, Validators.minLength(5)])
    }
  )
  URL: string | ArrayBuffer;

  constructor(private userService : UserService, private router: Router) { }

  ngOnInit(): void {
  }

  chnangeRole(role)
  {
    this.isOrg = role;
  }

  onSubmitRegisterForm()
  {
    console.log(this.registerForm.value)
    this.userService.registerUser(this.registerForm.value)
    .subscribe((data) =>
    {
      this.router.navigate(['/login']);
    })
  }
  
  useImage(event) 
  {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Read file as data url
      reader.onloadend = (e) => { // function call once readAsDataUrl is completed
        this.profileImage = e.target['result'].toString(); // Set image in element
        this.registerForm.value.image = this.profileImage
        // this._changeDetection.markForCheck(); // Is called because ChangeDetection is set to onPush
      };
    }
  }

  removeImage()
  {
    this.profileImage = ""
    this.registerForm.value.image = this.profileImage
  }

}
