import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class PopupComponent {
  @Input() title = '';
  @Input() closeText = '';
  @Input() loginText = '';
  @Input() visible = false;

  @Output() close = new EventEmitter<void>();
  @Output() subbmit = new EventEmitter<void>();
} 