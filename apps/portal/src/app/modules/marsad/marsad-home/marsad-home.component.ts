import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';

@Component({
  selector: 'app-marsad-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './marsad-home.component.html',
  styleUrls: ['./marsad-home.component.scss']
})
export class MarsadHomeComponent { } 