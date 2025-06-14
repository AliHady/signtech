import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  isLoading = false;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      company: [''],
      position: [''],
      address: ['']
    });

    // TODO: Load user data from service
    this.loadUserData();
  }

  loadUserData() {
    // Mock data - replace with actual API call
    const mockUserData = {
      name: 'محمد أحمد',
      email: 'mohamed@example.com',
      phone: '0501234567',
      company: 'شركة التقنية',
      position: 'مدير المشروع',
      address: 'الرياض، المملكة العربية السعودية'
    };

    this.profileForm.patchValue(mockUserData);
    this.profileForm.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      // TODO: Implement profile update logic
      console.log('Profile form submitted:', this.profileForm.value);
      setTimeout(() => {
        this.isLoading = false;
        this.isEditing = false;
        this.profileForm.disable();
      }, 2000);
    }
  }
} 