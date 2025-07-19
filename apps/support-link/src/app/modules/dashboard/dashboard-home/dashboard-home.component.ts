import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { DashboardSideBarComponent } from "../dashboard-side-bar/dashboard-side-bar.component";
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, NgxChartsModule, NgxTypedJsModule, DashboardSideBarComponent, DashboardHeaderComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor() { }

} 