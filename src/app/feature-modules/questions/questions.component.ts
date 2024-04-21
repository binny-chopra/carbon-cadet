import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CcApiService } from '../../services/cc-api.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  form!: FormGroup;
  currentSection: string = 'electricity';
  heading: string = 'Select your options to calculate carbon emissions.';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ccApiService: CcApiService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      sourceElectricity: ['NATURAL_GAS', Validators.required],
      load: ['', Validators.required],
      efficiency: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['VEG', Validators.required],
      bought: ['', Validators.required],
      used: ['', Validators.required],
      distance: ['', Validators.required],
      vehicle: ['CAR', Validators.required],
      temperature: ['high', Validators.required],
      sourceWater: ['SURFACE_WATER', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onSubmit() {
    const payload = {
      user: {
        userId: this.ccApiService.userId,
        userName: this.ccApiService.fullName,
        userRole: this.ccApiService.userRole
      },
      electricity: {
        source: this.form.get('source')?.value,
        load: this.form.get('load')?.value,
        duration: this.form.get('duration')?.value,
        efficiency: this.form.get('efficiency')?.value,
      },
      food: {
        type: this.form.get('type')?.value,
        boughtAmt: this.form.get('bought')?.value,
        usedAmt: this.form.get('used')?.value,
      },
      travel: {
        vehicle: this.form.get('vehicle')?.value,
        distance: this.form.get('distance')?.value,
      },
      water: {
        temp: this.form.get('temperature')?.value,
        source: this.form.get('source')?.value,
        quantity: this.form.get('quantity')?.value,
      },
    };
    this.ccApiService.postData(payload).subscribe(
      (response) => {
        console.log('API response:', response);
        this.ccApiService.energyConsumption = response.footprint;
        this.ccApiService.suggestion = response.suggestion;
        this.ccApiService.pledge = response.pledge;
        this.router.navigate(['/summary']);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  goBack() {
    if (this.currentSection === 'electricity') {
      this.router.navigate(['/']);
    } else if (this.currentSection === 'food') {
      this.currentSection = 'electricity';
      this.heading = 'Electricity Consumption';
    } else if (this.currentSection === 'travel') {
      this.currentSection = 'food';
      this.heading = 'Food Consumption';
    } else if (this.currentSection === 'water') {
      this.currentSection = 'travel';
      this.heading = 'Travelling';
    }
  }

  goNext() {
    if (this.currentSection === 'intro' && this.form.get('userId')?.value) {
      this.currentSection = 'electricity';
      this.heading = 'Electricity Consumption';
    } else if (this.currentSection === 'electricity') {
      this.currentSection = 'food';
      this.heading = 'Food Consumption';
    } else if (this.currentSection === 'food') {
      this.currentSection = 'travel';
      this.heading = 'Travelling';
    } else if (this.currentSection === 'travel') {
      this.currentSection = 'water';
      this.heading = 'Water Consumption';
    } else if (this.currentSection === 'water') {
      this.onSubmit();
    }
  }
}
