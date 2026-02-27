import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    templateUrl: './terms.html'
})
export class TermsComponent { }