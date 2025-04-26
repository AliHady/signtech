import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  template: `
    <div class="home-container">
      <h1>{{ 'home.title' | translate }}</h1>
      <p>{{ 'home.description' | translate }}</p>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class HomeComponent {} 