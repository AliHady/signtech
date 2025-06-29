import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'apps/support-link/src/environments/environment';

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

  navigate(
    url: string | null,
    currentLang: string,
    displayImage?: (url: string) => void
  ) {
    if (!url) return;

    const cleanUrl = url.split('#')[0];

    const isDocumentFile = /\.(pdf|docx?|xlsx?)$/i.test(cleanUrl);
    const isImageFile = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(cleanUrl);

    if (cleanUrl.startsWith('http')) {
      const fullUrl = cleanUrl;
      window.open(fullUrl, '_blank');
    } else if (isDocumentFile) {
      const fullUrl = environment.portalUrl + cleanUrl.replace('/CMS', '');
      window.open(fullUrl, '_blank');
    } else if (isImageFile && displayImage) {
      const fullImageUrl = environment.portalUrl + cleanUrl.replace('/CMS', '');
      displayImage(fullImageUrl);
    } else {
      var route = cleanUrl;
      if (cleanUrl.startsWith('/CMS/')) {
        route = cleanUrl.replace('CMS', currentLang);
      }
      else {
        route = currentLang + '/' + cleanUrl;
      }

      this.router.navigate([route]);
    }
  }
} 