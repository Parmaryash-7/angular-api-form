import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {

  public user: any = {
    name: "",
    email: "",
    age: null,
    phone_no: "",
    gender: "",
    profile_image: null,
    password: "",
  };

  head: string = "Create New User"
  btn_text: string = "Create"
  showPassword: boolean = false;
  selectedFile!: File;
  errMsg: string = '';
  errMsgImg: string = '';
  text: string = 'Loading...';
  isLoading: boolean = true;
  UserDefaultImage: any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.errMsgImg = '';

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.errMsgImg = "Please select a valid image file";
        this.user.profile_image = '';
        this.selectedFile = undefined!;
        this.alertShow.info('Invalid File Uploaded!');
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profile_image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  restrictNonNumeric(event: KeyboardEvent) {
    const regex = /[0-9]/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.warn("Form is invalid!");
      return;
    }

    const formData = new FormData();
    formData.append("is_from", "true");
    for (const key in this.user) {
      if (key !== "profile_image") {
        formData.append(key, this.user[key]);
      }
    }
    if (this.selectedFile) {
      formData.append("profile_image", this.selectedFile);
    }

    // for (let pair of (formData as any).entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    this.userDataService.createUser(formData).subscribe((response) => {
      // console.log(response);
      if (response.success == 1) {
        if (this.user.id) {
          this.alertShow.success('Yay! User is Updated');
        } else {
          this.alertShow.success('Yay! User is Created');
        }
        this.user = {
          name: "",
          email: "",
          age: null,
          phone_no: "",
          gender: "",
          profile_image: null,
          password: "",
        };
        this.router.navigate(['/user-table']);
      } else {
        this.errMsg = "Something Went Wrong!  Try again";
        this.alertShow.error('Sorry! Data not sent');
        return;
      }
    });
  }

  constructor(private alertShow: AlertService, private userDataService: UserDataService, private router: Router, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    const title = this.route.snapshot.data['title'];
    this.titleService.setTitle(title);
    if (this.route.snapshot.params.id) {
      this.head = "Edit User";
      this.btn_text = "Edit";
      this.userDataService.getUser(this.route.snapshot.params.id).subscribe((res) => {
        this.user = res.user;
        this.isLoading = false;
      },
        (err) => {
          console.error(err);
          this.isLoading = true;
          this.text = "Something Went Wrong!";
          this.alertShow.error('Something Went Wrong!');
        })
    } else {
      this.isLoading = false;
      // this.text = "Something Went Wrong! Please Go Back";
    }
  }
}