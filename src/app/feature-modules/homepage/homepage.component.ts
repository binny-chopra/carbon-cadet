import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CcApiService } from '../../services/cc-api.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  introForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ccApiService: CcApiService
  ) {}

  ngOnInit(): void {
    this.introForm = this.fb.group({
      fullName: [this.ccApiService.fullName ?? '', Validators.required],
      userId: [
        this.ccApiService.userId ?? '',
        [Validators.required, Validators.email],
      ],
      role: [this.ccApiService.userRole ?? 'Student', Validators.required],
    });
  }

  onIntroProceed(): void {
    if (this.introForm.valid) {
      this.ccApiService.userId = this.introForm.get('userId')?.value;
      this.ccApiService.fullName = this.introForm.get('fullName')?.value;
      this.ccApiService.userRole = this.introForm.get('role')?.value;
      this.router.navigate(['/ques']);
    }
  }
}
