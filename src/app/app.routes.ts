import { Routes } from '@angular/router';
import { QuestionsComponent } from './feature-modules/questions/questions.component';
import { SummaryComponent } from './feature-modules/summary/summary.component';
import { HomepageComponent } from './feature-modules/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'ques', component: QuestionsComponent },
  { path: 'summary', component: SummaryComponent },
];
