import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { TranslationService } from '@nimic/translations';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormsModule } from '@angular/forms';
import { SelectSearchComponent, TextInputComponent } from '@nimic/shared/ui';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

interface Report {
  ReportId: string;
  ReportTitle: string;
  ReportTitleEn: string | null;
  ReportDesc: string;
  ReportDescEn: string | null;
  Link: string;
  HasPrivilege: boolean;
}

interface Category {
  Id: number;
  Title: string;
  TitleEn: string | null;
  Desc: string | null;
  DescEn: string | null;
  Reports: Report[];
}

@Component({
  selector: 'app-marsad-reports',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, TranslateModule, RouterModule, NgxChartsModule, BreadcrumbsComponent, FormsModule, SelectSearchComponent, TextInputComponent],
  templateUrl: './marsad-reports.component.html',
  styleUrls: ['./marsad-reports.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MarsadReportsComponent implements OnInit, AfterViewInit {
  environment = environment;
  currentLang: string = 'ar';
  selectedCategory: number | null = null;
  categories: { value: number; label: string }[] = [];
  allReports: Report[] = [];
  showLightbox = false;
  selectedReport: Report | null = null;
  isMaximized = true;
  safeUrl: SafeResourceUrl | null = null;
  searchQuery: string = '';
  viewMode: 'list' | 'card' = 'list';

  get filteredReports() {
    let reports = this.allReports;
    
    // Filter by category if selected
    if (this.selectedCategory) {
      const category = this.rawCategories.find(c => c.Id === this.selectedCategory);
      reports = category ? category.Reports : [];
    }
    
    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      reports = reports.filter(report => 
        report.ReportTitle.toLowerCase().includes(query) || 
        (report.ReportDesc && report.ReportDesc.toLowerCase().includes(query))
      );
    }
    
    return reports;
  }

  get selectedCategoryTitle(): string {
    if (!this.selectedCategory) return this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories';
    const category = this.rawCategories.find(c => c.Id === this.selectedCategory);
    return category ? (this.currentLang === 'ar' ? category.Title : (category.TitleEn || category.Title)) : (this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories');
  }

  private rawCategories: Category[] = [
    {
      "Desc": null,
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "b96f6a1d-7ec6-48ba-b8fc-77f8aa1e5c27",
          "ReportTitle": "لوحات معلومات المكتب التنفيذي",
          "ReportTitleEn": null,
          "ReportDesc": "لوحات معلومات المكتب التنفيذي والتي تستعرض المهام والتكاليف واللجان والمجالس ومؤشرات الأداء لجهات المنظومة",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=9756d4f3-47fe-4734-bf53-d3bcfce9a7df",
          "HasPrivilege": false
        }
      ],
      "Id": 10,
      "Title": "المكتب التنفيذي",
      "TitleEn": null
    },
    {
      "Desc": null,
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "1e1b9fb5-dc23-4143-b59f-4d2e648b9ef4",
          "ReportTitle": "تقرير قياس أثر تطبيق أدوات عدالة المنافسة",
          "ReportTitleEn": null,
          "ReportDesc": "هي مجموعات المنتجات التي تم تطبيق أدوات عدالة المنافسة عليها",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20قائمة%20أثر%20لجنة%20عدالة%20المنافسة&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "0f9327f8-129d-42eb-8aaa-1a812611ceac",
          "ReportTitle": " أداء الادارات التشغيلي",
          "ReportTitleEn": null,
          "ReportDesc": "تقدم هذه اللوحة نظرة  شاملة عن طلبات الاعفاء الجمركي، مع تفاصيل عن حالتها وعددها، كما تسلط الضوء على أكبر البنود الجمركية من حيث القيمة طلبًا للفسح الكيميائي والإعفاء الجمركي، مما يتيح مساعدة المستخدمين في فهم وتحليل الأنماط والاتجاهات في طلبات الاعفاء الجمركي.",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=cc0ab3c9-e66f-4b29-be5e-29a4b96748c5",
          "HasPrivilege": false
        },
        {
          "ReportId": "23da80c5-c913-4cbe-9ab8-2ee39b0242ce",
          "ReportTitle": " المؤشرات الصناعية الشهري",
          "ReportTitleEn": null,
          "ReportDesc": " يعرض التقرير أهم مؤشرات التراخيص الصناعية من خمسة مناظير ليعطي نظرة شمولية لحالة التراخيص حسب المناظير التالية:\n•\tالإنتاج\n•\tالنشاطات\n•\tالمناطق\n•\tرأس المال\n•\tحالة المصانع",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fتقرير%20مؤشرات%20التراخيص%20الصناعية%20الشهري%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "44fca304-481e-4e67-9b0a-32723a5d8866",
          "ReportTitle": "قائمة الصادرات والواردات لدولة حسب السنة",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2Fأخرى%2Fقائمة%20الصادرات%20والواردات%20لدولة%20حسب%20السنة%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "4db31a34-ec5a-4b1a-966e-e8e8cb5c676f",
          "ReportTitle": "تحليل الاستثمار والفرص الاستثمارية",
          "ReportTitleEn": null,
          "ReportDesc": "لوحة معلومات متقدمة لتحليل الاستثمارات واستشكاف فرص استثمارية جديدة في المنطقة استنادًا على الاستراتيجية الوطنية للصناعة (NIS) والاستراتيجية الوطنية للتوطين (NLS)، مصممة لتوفير مرئيات شاملة وعميقة لدعم المستمثرين",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=c3225f4e-06c0-4a2e-980c-4d39fbd9a383",
          "HasPrivilege": false
        },
        {
          "ReportId": "24db3bd1-b707-4a15-9e5b-f712fe281ab0",
          "ReportTitle": "تقرير الأنشطة الصناعية الشهري",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض عدد المصانع المنتجة ورأس المال بالمليون وعدد العمالة المرخصه حسب النشاط الصناعي ",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20تقرير%20الأنشطة%20الصناعية%20الشهري&rs:Embed=true",
          "HasPrivilege": false
        }
      ],
      "Id": 5,
      "Title": "اقتصادي ومالي",
      "TitleEn": null
    },
    {
      "Desc": null,
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "7c2b1bc1-3c19-4b03-9407-a967050019a1",
          "ReportTitle": "متابعة زيارات المصانع",
          "ReportTitleEn": null,
          "ReportDesc": "متابعة حالة المصانع القائمة من حيث وضع الترخيص وحالته وحجم المنشأة وحجم الاستثمار وحالة المصنع وحالة تصاريحه وعدد العمالة",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2Fمتابعة%20زيارات%20المصانع&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "be8fbe59-d595-4e49-b8e3-47d882940807",
          "ReportTitle": "بطاقة مدينة",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض عدد المصانع لكل مدينة حسب الحالة والموقع ونوع الاستثمار وحجم المنشأة والنشاط الصناعي",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20بطاقة%20مدينة&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "d60f6229-1447-4689-8c04-b1e16f679ea9",
          "ReportTitle": "إحصائية المصانع حسب النشاط الصناعي والمنطقة الإدارية وحجم المصنع",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20إحصائية%20المصانع%20حسب%20النشاط%20الصناعي%20والمنطقة%20الإدارية%20وحجم%20المصنع&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "3afc95a3-fad9-46aa-abc9-b7fad0543038",
          "ReportTitle": "قائمة المصانع لبند جمركي",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fقائمة%20المصانع%20لبند%20جمركي%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "a3938d91-0c6b-4d51-8c8e-cdd0c129cf8e",
          "ReportTitle": "قائمة الفسوح الكيميائية لفترة",
          "ReportTitleEn": null,
          "ReportDesc": "قائمة تستعرض المصانع التي حصلت على فسوحات كيميائية مع بياناتها",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20قائمة%20الفسوح%20الكيميائية%20لفترة&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "0542e292-c366-40be-9164-d42bd0e9a3a7",
          "ReportTitle": "قائمة المصانع لمجموعة بنود جمركية",
          "ReportTitleEn": null,
          "ReportDesc": "هي بيانات المصانع المنتجة لمجموعة بنود جمركية محددة مع تفاصيل الإنتاج المرخص",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fقائمة%20المصانع%20لمجموعة%20بنود%20جمركية%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "24580861-4cd1-40d2-ad1b-ddca2a90495f",
          "ReportTitle": "بيانات المنطقة ",
          "ReportTitleEn": null,
          "ReportDesc": "يتم استعراض بيانات ومؤشرات المنطقة محددة في هذا التقرير، ليعطي معلومات تخص المدينة من عدة مناظير.",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2Fأخرى%2Fبيانات%20المنطقة&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "7c696b86-e11e-4a26-ab61-dece341939e3",
          "ReportTitle": "إحصائية مجموع عدد المصانع و العمالة الفعلية و حجم الاستثمارات لمجموعة بنود جمركية",
          "ReportTitleEn": null,
          "ReportDesc": "إحصائية تستعرض عدد المصانع وعدد العمالة سواء الوافدة أو السعودية، إضافة لحجم الاستثمار لمجموعة بنود جمركية",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fإحصائية%20مجموع%20عدد%20المصانع%20و%20العمالة%20الفعلية%20و%20حجم%20الاستثمارات%20لمجموعة%20بنود%20جمركية%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "01870ebf-f012-48ff-bb6f-24ed0829332d",
          "ReportTitle": "قائمة المصانع لمجموعة بنود جمركية + الإحداثيات",
          "ReportTitleEn": null,
          "ReportDesc": "قائمة تحتوي على معلومات تفصيلية حول اسم البند ونوعه وكميته، كذلك تحوي قائمة معلومات مكانية حول مكان المصنع ونطاقه",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fقائمة%20المصانع%20لمجموعة%20بنود%20جمركية%20مع%20الإحداثيات%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "c1016354-4866-4989-97f6-2776337ba277",
          "ReportTitle": "قائمة المصانع",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2fأخرى%2fقائمة+المصانع+حسب+التاريخ+المحدد&rs:Embed=True",
          "HasPrivilege": false
        },
        {
          "ReportId": "3b76de9a-11da-400f-9669-2d8cf6e5e099",
          "ReportTitle": "تقرير المناطق الإدارية الشهري",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض عدد المصانع لكل مدينة حسب الحالة والموقع ونوع الاستثمار وحجم المنشأة والنشاط الصناعي",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20تقرير%20المناطق%20الإدارية%20الشهري&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "1f9e24f5-6343-496e-a3da-038b0db6b864",
          "ReportTitle": "محفظة الأراضي الصناعية ",
          "ReportTitleEn": null,
          "ReportDesc": "لوحة معلومات توفر تحليل وتتبع للمدن والمناطق الصناعية ومؤشرات الاداء الرئيسية للأراضي، وجاهزية البنية التحتية لها\n ",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=b99b8d95-a5f6-4ceb-9200-8455568cabb9",
          "HasPrivilege": false
        },
        {
          "ReportId": "642f32a9-f5e8-4a9f-baf3-13f29ee6d7a3",
          "ReportTitle": "قائمة المصانع التي بحاجة إلى متابعة",
          "ReportTitleEn": null,
          "ReportDesc": "قائمة المصانع الغير ملغية والتي بحاجة إلى متابعة مرتبة حسب الأكثر أهمية",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20قائمة%20المصانع%20التي%20بحاجة%20إلى%20متابعة&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "cc1c2c55-0e92-4966-b599-51d49404b7d7",
          "ReportTitle": "الخدمات التي حصل عليها المصنع",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض البيانات العامة للمصنع, الخدمات التي حصل عليها من: وزارة الصناعة والثروة المعدنية, وهيئة المدن الصناعية, والهيئة الملكية بالجبيل وينبع, وهيئة المدن والمناطق الاقتصادية, ووزارة البلدية, والشركة السعودية للكهرباء, وشركة المياه الوطنية, بالإضافة إلى آخر حركة تصدير أو توريد",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2FN%20الخدمات%20التي%20حصل%20عليها%20المصنع&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "036e91bf-7789-4f6d-ae1c-69b3a9d98acc",
          "ReportTitle": "لوحة معلومات خدمات صناعي",
          "ReportTitleEn": null,
          "ReportDesc": "لوحة معلومات تستعرض الطلبات وعددها حسب نوع الخدمة وحالة الطلب, ومتوسط عدد الأيام لإنهاء الطلبات:\n1- الخدمات \n2- الترخيص الصناعي \n3- الفسح الكيميائي\n4- الإعفاء الجمركي\n5- تأييد العمالة\n",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=098c1c46-36a4-4672-81eb-85c965450087",
          "HasPrivilege": false
        },
        {
          "ReportId": "80bac74f-16ad-48ed-8990-acc93d9ce795",
          "ReportTitle": "الوضع النظامي للمنشآت الصناعية",
          "ReportTitleEn": null,
          "ReportDesc": "الوضع النظامي للمنشآت الصناعية: هي ملاحظات نظامية للمنشآت الصناعية ولها تأثير سلبي على الإحصائيات إن وجدت لذا كانت الحاجة إلى عرض الملاحظات النظامية بـ لوحة معلومات.",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=6910952a-30b6-4007-8c03-89c027a1405a",
          "HasPrivilege": false
        },
        {
          "ReportId": "f8e18203-91ad-4cce-b644-9f021615b11e",
          "ReportTitle": "بيانات المنشأة ",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يستعرض بيانات المصنع، يشمل جميع البيانات التي يمكن حصرها حاليا للمنشأة",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2Fبيانات%20المنشأة%20الملخصة&rs:Embed=true",
          "HasPrivilege": false
        }
      ],
      "Id": 9,
      "Title": "المنشآت والمرافق والخدمات اللوجستية",
      "TitleEn": null
    },
    {
      "Desc": null,
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "67d122ba-d393-4f61-9912-15789c2ff2fc",
          "ReportTitle": "تعزيز محرك التوطين",
          "ReportTitleEn": null,
          "ReportDesc": "تستهدف لوحة المعلومات معرفة تفاصيل المنشآت المنتجة لسلسلة القيمة لتطوير  وتوطين الإنتاج.",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=954f9d14-8de5-4f70-b74a-c066e11739f2&formatLocale=en-GB",
          "HasPrivilege": false
        },
        {
          "ReportId": "55acdb38-07ad-4b23-88a0-0777af4ae0c4",
          "ReportTitle": "العرض والطلب للخامات المعدنية",
          "ReportTitleEn": null,
          "ReportDesc": "تستعرض لوحة المعلومات صادرات وواردات الخامات المعدنية ومقارنة الكميات والقيم خلال الربع الحالي من السنة الحالية والربع السابق  مع معدل النمو.",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=875ffd24-e70a-47dc-82f6-cf8f37c5e487",
          "HasPrivilege": false
        }
      ],
      "Id": 8,
      "Title": "المنتجات وسلاسل الإمداد",
      "TitleEn": null
    },
    {
      "Desc": null,
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "df6cae54-ac8d-49ba-8a3a-76ae474c533e",
          "ReportTitle": "قائمة العمالة الفعلية للمصانع لآخر شهرين حسب السجل التجاري",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض مجموع العمالة السعوديين والوافدين بحسب السجل التجاري للمصنع",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fقائمة%20العمالة%20الفعلية%20للمصانع%20لآخر%20شهرين%20حسب%20السجل%20التجاري%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "d90486e6-b764-49e9-8969-78dc403796b4",
          "ReportTitle": "التقرير الشهري لقياس آثر الإعفاء من رسوم العمالة للقطاع الصناعي",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض قيمة الإعفاءات من المقابل المالي في قطاع الصناعة .",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2Fالتقرير%20الشهري%20لقياس%20أثر%20الإعفاء%20من%20رسوم%20العمالة%20للقطاع%20الصناعي&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "3d7268eb-4c73-4889-9fde-7f7ffb64ec2e",
          "ReportTitle": "الإستعلام عن استحقاق إعفاء المقابل المالي لمصنع",
          "ReportTitleEn": null,
          "ReportDesc": "هي لوحة معلومات تعرض قيمة الإعفاءات من المقابل المالي في قطاع الصناعة.",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fالإستعلام%20عن%20استحقاق%20إعفاء%20المقابل%20المالي%20لمصنع%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "0868cd8e-6564-4e04-b0a2-8936982ddd97",
          "ReportTitle": "تقرير العمالة الفعلية الشهري",
          "ReportTitleEn": null,
          "ReportDesc": "تقرير يعرض العمالة الفعلية للمصانع المنتجة وتحت الانشاء حسب حجم المنشأة, النطاق, الجنسية, والجنس",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fتقرير%20العمالة%20الفعلية%20الشهري%20N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "23d81d9b-baab-435b-aa1f-a71f05a7472d",
          "ReportTitle": "إعفاءات المقابل المالي للعمالة",
          "ReportTitleEn": null,
          "ReportDesc": "لوحة معلومات تستعرض قيمة الإعفاءات من المقابل المالي للعمالة الوافدة بقطاع الصناعة",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=cc525b31-da4e-4f8f-8d94-b388b4dda9fd",
          "HasPrivilege": false
        },
        {
          "ReportId": "2a1ec5a3-8cf6-41e9-b2a1-bdc05c2325ae",
          "ReportTitle": "تقرير مؤشرات العمالة الصناعية الشهري",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2fأخرى%2fتقرير+مؤشرات+العمالة+الصناعية+الشهري+N&rs:Embed=true",
          "HasPrivilege": false
        },
        {
          "ReportId": "32c9aa15-01f1-4284-bf68-aa1824c411ac",
          "ReportTitle": "وصف القوى العاملة في قطاع الصناعة",
          "ReportTitleEn": null,
          "ReportDesc": "هي لوحة معلومات تعرض العمالة الفعلية بقطاع الصناعة وتشمل العمالة الفعلية السعودية والوافدة.",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=f519d5cd-62b7-418c-ae84-546aaf42914f",
          "HasPrivilege": false
        }
      ],
      "Id": 4,
      "Title": "العمالة",
      "TitleEn": null
    },
    {
      "Desc": "جميع حالات الاستخدام التي من نوع \"قائمة\"\r\n",
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "e099550b-bcfc-425d-a44c-379f585fa8a5",
          "ReportTitle": "العمالة الفعلية حسب التاريخ والنشاط والمنطقة",
          "ReportTitleEn": null,
          "ReportDesc": "قائمة تعرض عدد  الذكور السعوديين, الإناث السعوديين, إجمالي السعوديين, الذكور الوافدين, الإناث الوافدين, إجمالي الوافدين, إجمالي العمالة حسب التاريخ",
          "ReportDescEn": null,
          "Link": "https://niicprodssrs.niic.gov.sa/ReportServer/Pages/ReportViewer.aspx?%2FOLD_SSRS%2Fالعمالة%20الفعلية%20حسب%20التاريخ%20والنشاط%20والمنطقة%20%20N&rs:Embed=true",
          "HasPrivilege": false
        }
      ],
      "Id": 1,
      "Title": "قوائم",
      "TitleEn": null
    },
    {
      "Desc": "جميع حالات الاستخدام التي من نوع \"لوحة معلومات\"\r\n",
      "DescEn": null,
      "Reports": [
        {
          "ReportId": "892cae21-5f55-4aeb-a703-b7180013d564",
          "ReportTitle": "لوحة معلومات مؤشرات اداء تهمنا",
          "ReportTitleEn": null,
          "ReportDesc": "",
          "ReportDescEn": null,
          "Link": "https://niicprodreport.niic.gov.sa/powerbi/?id=59e42b79-6da6-4edd-aebd-1bed3fe56381",
          "HasPrivilege": false
        }
      ],
      "Id": 3,
      "Title": "لوحات المعلومات",
      "TitleEn": null
    }
  ];

  constructor(
    private translationService: TranslationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.categories = [
      { value: 0, label: this.currentLang === 'ar' ? 'كل الفئات' : 'All Categories' },
      ...this.rawCategories.map(cat => ({
        value: cat.Id,
        label: this.currentLang === 'ar' ? cat.Title : (cat.TitleEn || cat.Title)
      }))
    ];

    this.selectedCategory = 0;

    this.allReports = this.rawCategories.flatMap(cat => cat.Reports);
  }

  ngAfterViewInit() {}

  scrollToTop(): void {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200);
  }

  openReport(report: Report): void {
    this.selectedReport = report;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(report.Link);
    this.showLightbox = true;
    document.body.style.overflow = 'hidden'; 
  }

  closeLightbox(): void {
    this.selectedReport = null;
    this.showLightbox = false;
    this.isMaximized = true;
    document.body.style.overflow = ''; 
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'card' : 'list';
  }
} 