import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    templateUrl: './blog.html'
})
export class BlogComponent { }