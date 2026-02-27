import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-returns',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, RouterLink],
    templateUrl: './returns.html'
})
export class ReturnsComponent { }