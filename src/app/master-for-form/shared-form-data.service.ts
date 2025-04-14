import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFormDataService {
  private formDataSubject = new BehaviorSubject<FormData | null>(null);
  formData$ = this.formDataSubject.asObservable();
  
  sendFormData(data: FormData) {
    this.formDataSubject.next(data);
  }
}
