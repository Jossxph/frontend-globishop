import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-promotions',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    templateUrl: './promotions.html'
})
export class PromotionsComponent { }