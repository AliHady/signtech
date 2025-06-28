import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private router: Router) { }

  getImageSrc(image: string | null | undefined): string {
    if (!image) return '';
    if (image.startsWith('data:image')) return image;
    return `data:image/png;base64,${image}`;
  }
} 