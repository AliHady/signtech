import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-scroll-indicator',
  template: `
    <div class="progress-container">
      <div class="progress-bar" [style.width.%]="scrollPercent"></div>
    </div>
  `,
  styles: [`
    .progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.6rem;              
      background: rgba(0,0,0,.1);
      z-index: 9999;
          opacity: 0.9;
    }
    .progress-bar {
      height: 100%;
      background: #413258;      
      transition: width .1s linear;
      width: 0%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ScrollIndicatorComponent  {
  scrollPercent = 0;

  /** Update on every scroll (and when page is first painted) */
  @HostListener('window:scroll', []) onScroll() { this.calcProgress(); }
  @HostListener('window:load',   []) onLoad()   { this.calcProgress(); }

  private calcProgress(): void {
    const   doc   = document.documentElement;
    const   top   = doc.scrollTop  || document.body.scrollTop;
    const   dist  = doc.scrollHeight - doc.clientHeight;
    this.scrollPercent = dist ? (top / dist) * 100 : 0;
  }
}
