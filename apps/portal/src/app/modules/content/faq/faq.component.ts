import { Component } from '@angular/core';
import { HeaderService } from '../../../shared/services/header.service';
import { NavMenu } from '../../../shared/models/navmen.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationsModule } from '@nimic/translations';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id: number;
  title: string;
  url: string;
  children?: MenuItem[];
}

interface FAQItem {
  question: string;
  answer: string;
  index: number;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent,
    BreadcrumbsComponent,
    TranslateModule,
    TranslationsModule,
    FormsModule
  ],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  menuItems: MenuItem[] = [];
  loading = true;
  error = '';
  openFaqs: boolean[] = [false, false, false];
  searchQuery: string = '';
  filteredFAQs: FAQItem[] = [];

  private faqItems: FAQItem[] = [
    {
      question: 'كيف يمكنني إنشاء حساب جديد؟',
      answer: 'يمكنك إنشاء حساب جديد من خلال النقر على زر "تسجيل" في أعلى الصفحة واتباع الخطوات المطلوبة.',
      index: 0
    },
    {
      question: 'كيف يمكنني استعادة كلمة المرور؟',
      answer: 'يمكنك النقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول واتباع التعليمات لإعادة تعيين كلمة المرور الخاصة بك.',
      index: 1
    },
    {
      question: 'كيف يمكنني التواصل مع الدعم الفني؟',
      answer: 'يمكنك التواصل مع فريق الدعم الفني من خلال نموذج الاتصال في صفحة "اتصل بنا" أو عبر البريد الإلكتروني للدعم.',
      index: 2
    }
  ];

  constructor(private headerService: HeaderService) {
    this.filteredFAQs = [...this.faqItems];
  }

  ngOnInit() {
    this.fetchMenuItems();
  }

  private fetchMenuItems() {
    this.loading = true;
    this.error = '';
    
    this.headerService.getNavigationMenu().subscribe({
      next: (response: NavMenu) => {
        this.menuItems = response.map(item => ({
          id: item.Id,
          title: item.Text,
          url: item.Url,
          children: item.Items?.map(child => ({
            id: child.Id,
            title: child.Text,
            url: child.Url
          }))
        }));
        this.loading = false;
      },
      error: (error: Error) => {
        console.error('Error fetching menu items:', error);
        this.error = 'Failed to load menu items. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleFaq(index: number): void {
    this.openFaqs[index] = !this.openFaqs[index];
  }

  filterFAQs(): void {
    if (!this.searchQuery.trim()) {
      this.filteredFAQs = [...this.faqItems];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredFAQs = this.faqItems.filter(item => 
      item.question.toLowerCase().includes(query) || 
      item.answer.toLowerCase().includes(query)
    );
  }

  isVisible(index: number): boolean {
    return this.filteredFAQs.some(item => item.index === index);
  }
} 