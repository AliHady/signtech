import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class BreadcrumbsComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];

  ngOnInit() {
    console.log('Breadcrumb Items:', this.items);
  }
} 