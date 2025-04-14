import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetails } from '../user-details';
import { SharedFormDataService } from '../master-for-form/shared-form-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.css']
})
export class AngularFormsComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    profile_image: new FormControl(null, [Validators.required]),
  });
  showPassword: boolean = false
  errMsgImg: string;
  selectedFile: any;

  constructor(private sharedService: SharedFormDataService, private router: Router) { }

  ngOnInit() {
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get age() {
    return this.userForm.get('age');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get phone_no() {
    return this.userForm.get('phone_no');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.errMsgImg = '';

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.errMsgImg = "Please select a valid image file";
        this.selectedFile = undefined!;
        this.userForm.patchValue({
          profile_image: null
        });
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgFile = e.target.result;
        this.userForm.patchValue({
          profile_image: imgFile
        });
      };
      reader.readAsDataURL(file);
    }
  }

  restrictNonNumeric(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('is_form', "true");
      for (const key in this.userForm.value) {
        if (key !== "profile_image") {
          formData.append(key, this.userForm.value[key]);
        }
      }
      if (this.selectedFile) {
        formData.append("profile_image", this.selectedFile);
      }

      // for (let pair of (formData as any).entries()) {
      //   console.log(`${pair[0]}:`, pair[1]);
      // }

      this.sharedService.sendFormData(formData);
      this.router.navigate(['/angular-forms/user-info'])
    }
  }
}
