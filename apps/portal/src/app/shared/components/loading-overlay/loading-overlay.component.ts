import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  @Input() isLoading: boolean = false;
} 