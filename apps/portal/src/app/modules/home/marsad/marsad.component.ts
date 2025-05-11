import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-marsad-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './marsad.component.html',
  styleUrls: ['./marsad.component.scss']
})
export class MarsadComponent {
  constructor() {}
}  