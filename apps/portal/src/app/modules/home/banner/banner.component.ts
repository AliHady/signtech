import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { TranslationService } from '@nimic/translations';
import { Subscription } from 'rxjs';

interface Slide {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  public swiper: Swiper | undefined;
  currentSlideIndex = 0;
  private languageSubscription: Subscription;

  slides: Slide[] = [
    {
      title: 'المركز الوطني للمعلومات الصناعية والتعدينية',
      description: 'يهدف المركز إلى أن يكون المرجع الموثوق للمعلومات الصناعية والتعدينية في المملكة، من خلال توحيد البيانات، وضبط جودة المنتجات وفق الأنظمة العالمية، وتقديم الإحصائيات والتقارير، وتوطين المنتجات وتسويقها محلياً ودولياً.',
      imageUrl: 'https://picsum.photos/800/400?random=1',
      link: '/about'
    },
    {
      title: 'تطوير القطاع الصناعي والتعديني',
      description: 'نعمل على تطوير القطاع الصناعي والتعديني في المملكة من خلال توفير المعلومات الدقيقة والتحليلات المتخصصة التي تساعد في اتخاذ القرارات الاستراتيجية.',
      imageUrl: 'https://picsum.photos/800/400?random=2',
      link: '/services'
    },
    {
      title: 'الابتكار في الصناعة',
      description: 'نسعى لتعزيز الابتكار في القطاع الصناعي من خلال دعم المشاريع الناشئة وتوفير الموارد اللازمة لتطوير الأفكار المبتكرة.',
      imageUrl: 'https://picsum.photos/800/400?random=3',
      link: '/innovation'
    },
    {
      title: 'الاستدامة الصناعية',
      description: 'نركز على تعزيز الاستدامة في القطاع الصناعي من خلال تطبيق أفضل الممارسات البيئية وتشجيع استخدام الطاقة المتجددة.',
      imageUrl: 'https://picsum.photos/800/400?random=4',
      link: '/sustainability'
    },
    {
      title: 'التدريب والتطوير',
      description: 'نقدم برامج تدريبية متخصصة لتطوير المهارات في القطاع الصناعي والتعديني، بما يضمن مواكبة أحدث التطورات التقنية.',
      imageUrl: 'https://picsum.photos/800/400?random=5',
      link: '/training'
    }
  ];

  constructor(private translationService: TranslationService) {
    register();
    this.languageSubscription = this.translationService.currentLang$.subscribe(() => {
      this.updateSlidesContent();
    });
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.swiper) {
      this.swiper.destroy();
    }
  }

  private initializeSwiper() {
    this.swiper = new Swiper('.banner-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      on: {
        slideChange: () => {
          this.currentSlideIndex = this.swiper?.realIndex ?? 0;
        }
      }
    });
  }

  private updateSlidesContent() {
    // Destroy the current swiper instance
    if (this.swiper) {
      this.swiper.destroy();
    }

    // Update slides content based on current language
    // You can add your translation logic here
    // For example:
    // this.slides = this.languageService.getTranslatedSlides();

    // Reinitialize swiper after content update
    setTimeout(() => {
      this.initializeSwiper();
    }, 0);
  }
} 