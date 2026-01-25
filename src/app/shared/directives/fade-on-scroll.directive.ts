import { Directive, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeOnScroll]',
  standalone: true
})
export class FadeOnScrollDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
}