import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('ar');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() { }

  setLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
} 