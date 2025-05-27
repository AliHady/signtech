import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent, SelectSearchComponent, SelectOption } from '@nimic/shared/ui';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

interface Study {
  id: number;
  name: string;
  type: string;
  subject: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-consulting-studies-list',
  templateUrl: './consulting-studies-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TextInputComponent,
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent
  ]
})
export class ConsultingStudiesListComponent implements OnInit {
  currentLang = 'ar';

  studies: Study[] = [
    {
      id: 1,
      name: 'دراسة تحليلية للاقتصاد المحلي',
      type: 'دراسة اقتصادية',
      subject: 'الاقتصاد',
      description: 'تحليل شامل للوضع الاقتصادي المحلي وتأثيراته',
      category: 'دراسات اقتصادية'
    },
    {
      id: 2,
      name: 'دراسة اجتماعية عن التنمية المستدامة',
      type: 'دراسة اجتماعية',
      subject: 'التنمية المستدامة',
      description: 'تحليل للعوامل الاجتماعية المؤثرة على التنمية المستدامة',
      category: 'دراسات اجتماعية'
    },
    {
      id: 3,
      name: 'دراسة تنموية للبنية التحتية',
      type: 'دراسة تنموية',
      subject: 'البنية التحتية',
      description: 'تقييم شامل للبنية التحتية وتأثيرها على التنمية',
      category: 'دراسات تنموية'
    },
    {
      id: 4,
      name: 'دراسة تحليلية لسوق العمل',
      type: 'دراسة اقتصادية',
      subject: 'سوق العمل',
      description: 'تحليل متعمق لمتطلبات سوق العمل وتحدياته',
      category: 'دراسات اقتصادية'
    },
    {
      id: 5,
      name: 'دراسة اجتماعية عن التعليم العالي',
      type: 'دراسة اجتماعية',
      subject: 'التعليم العالي',
      description: 'تقييم جودة التعليم العالي وتأثيره على المجتمع',
      category: 'دراسات اجتماعية'
    },
    {
      id: 6,
      name: 'دراسة تنموية للقطاع الصناعي',
      type: 'دراسة تنموية',
      subject: 'القطاع الصناعي',
      description: 'تحليل فرص وتحديات القطاع الصناعي',
      category: 'دراسات تنموية'
    },
    {
      id: 7,
      name: 'دراسة اقتصادية للاستثمار الأجنبي',
      type: 'دراسة اقتصادية',
      subject: 'الاستثمار الأجنبي',
      description: 'تقييم تأثير الاستثمار الأجنبي على الاقتصاد المحلي',
      category: 'دراسات اقتصادية'
    }
  ];

  filteredStudies: Study[] = [];

  // Modal state
  isCertificateModalOpen = false;
  selectedStudy: Study | null = null;

  ngOnInit() {
    this.filteredStudies = this.studies;
  }

  openCertificateModal(study: Study) {
    this.selectedStudy = study;
    this.isCertificateModalOpen = true;
  }

  closeCertificateModal() {
    this.isCertificateModalOpen = false;
    this.selectedStudy = null;
  }
}