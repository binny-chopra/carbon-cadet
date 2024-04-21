import { Component } from '@angular/core';
import { CcApiService } from '../../services/cc-api.service';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  public result!: string;
  public suggestion!: string;
  public pledge!: string;
  public pledgeForm: FormGroup;
  constructor(
    private ccApiService: CcApiService,
    private formBuilder: FormBuilder
  ) {
    this.result = this.ccApiService.energyConsumption;
    this.suggestion = this.ccApiService.suggestion;
    this.pledge = this.ccApiService.pledge;
    this.pledgeForm = this.formBuilder.group({
      targetValue: [''], // Initialize form control for targetValue
    });
  }

  improvedOrNot(): boolean {
    if (Number(this.result) > Number(this.pledge)) {
      return true;
    }
    return false;
  }

  submitPledge() {}
}
