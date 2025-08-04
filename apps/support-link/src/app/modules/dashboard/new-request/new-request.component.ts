import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DynamicFormComponent } from '@support-link/shared/ui';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { LookupService } from '../../../../../../../libs/shared/utils/src/lib/services/lookup.service';
import { NEW_REQUEST_CONFIG } from '../config/new-request.config';
import { environment } from 'apps/support-link/src/environments/environment';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../dashboard-side-bar/dashboard-side-bar.component';
import { OurServicesService } from '../../services/services/our-services.service';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    DynamicFormComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    DashboardHeaderComponent,
    DashboardSideBarComponent
  ],
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.3s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class NewRequestComponent implements OnInit {
  servicesLoaded = false;
  prioritiesloaded = false;
  error = '';
  formConfig!: typeof NEW_REQUEST_CONFIG;

  constructor(
    private lookupService: LookupService,
    private ourServicesService: OurServicesService) { }

  ngOnInit() {
    this.formConfig = NEW_REQUEST_CONFIG;
    this.getLookup('Priority', 'PriorityId');
    this.getLookup('ContactTime', 'ContactTimeId');
    this.ourServicesService.getOurServices().subscribe(data => {
      const field = this.formConfig.fields.find(f => f.name === 'ServiceId');
      if (field) {
        field.options = data.Items.map(item => ({
          value: String(item.Id),
          label: { en: item.TitleEn || item.Title, ar: item.Title }
        }));
      }
      this.servicesLoaded = true;
    });
  }

  getLookup(lookup: string, filedName: string) {
    this.lookupService.getLookup(environment.contentUrl, lookup).subscribe({
      next: (response) => {
        const field = this.formConfig.fields.find(f => f.name === filedName);
        if (field) {
          field.options = response.map(item => ({
            value: item.Id,
            label: { en: item.TitleEn || item.Title, ar: item.Title }
          }));
        }
        this.prioritiesloaded = true;
      },
      error: (err) => {
        this.error = 'Failed to load lookup. Please try again later.';
        this.prioritiesloaded = false;
        console.error('Error loading lookup:', err);
      }
    });
  }

  onFormSubmitted(response: any) {
    console.log('Form submitted successfully:', response);
  }

  onFormError(error: any) {
    console.error('Form submission failed:', error);
  }
}