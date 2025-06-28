import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NetworkDot {
  size: string;
  top: string;
  left: string;
}

@Component({
  selector: 'app-join-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-now.component.html',
  styleUrls: ['./join-now.component.scss']
})
export class JoinNowComponent {
  networkDots: NetworkDot[] = [
    { size: '32px', top: '22%', left: '19%' },
    { size: '20px', top: '18%', left: '32%' },
    { size: '24px', top: '25%', left: '45%' },
    { size: '18px', top: '30%', left: '60%' },
    { size: '28px', top: '35%', left: '75%' },
    { size: '22px', top: '40%', left: '60%' },
    { size: '20px', top: '48%', left: '30%' },
    { size: '26px', top: '50%', left: '50%' },
    { size: '32px', top: '52%', left: '65%' },
    { size: '18px', top: '60%', left: '80%' },
    { size: '24px', top: '62%', left: '40%' },
    { size: '20px', top: '68%', left: '55%' },
    { size: '28px', top: '70%', left: '70%' },
    { size: '22px', top: '75%', left: '35%' },
    { size: '18px', top: '80%', left: '60%' },
    { size: '24px', top: '82%', left: '78%' },
    { size: '20px', top: '60%', left: '20%' },
    { size: '22px', top: '35%', left: '85%' },
    { size: '18px', top: '15%', left: '80%' },
    { size: '24px', top: '55%', left: '85%' }
  ];
}