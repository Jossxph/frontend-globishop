import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, RouterLink],
    templateUrl: './about.html'
})
export class AboutComponent { }