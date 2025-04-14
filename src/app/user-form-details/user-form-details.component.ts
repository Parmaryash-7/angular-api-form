import { Component, OnInit } from '@angular/core';
import { SharedFormDataService } from '../master-for-form/shared-form-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-form-details',
  templateUrl: './user-form-details.component.html',
  styleUrls: ['./user-form-details.component.css']
})
export class UserFormDetailsComponent implements OnInit {

  userInfo: any;
  imgUrl: any;
  constructor(private sharedService: SharedFormDataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sharedService.formData$.subscribe((data: FormData | null) => {
      if (data) {
        this.userInfo = {};
        for (let [key, value] of (data as any).entries()) {
          if (key === 'profile_image' && value instanceof File) {
            this.userInfo[key] = value
            const unsafeUrl = URL.createObjectURL(value);
            this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeUrl);
          } else {
            this.userInfo[key] = value;
          }
        }
        console.log(this.userInfo);
      }
    });
  }  
}
