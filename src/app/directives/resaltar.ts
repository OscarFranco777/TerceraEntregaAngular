import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
})
export class Resaltar implements OnInit, OnDestroy {
  constructor(private el: ElementRef) {
    console.log('[Resaltar] Constructor ejecutado');
  }

  ngOnInit(): void {
    console.log('[Resaltar] ngOnInit ejecutado');
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }

  ngOnDestroy(): void {
    console.log('[Resaltar] ngOnDestroy ejecutado');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.resaltar('#ffeb3b', '2px solid #fbc02d', '1.03');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resaltar('transparent', 'none', '1');
  }

  private resaltar(bgColor: string, border: string, scale: string) {
    const el = this.el.nativeElement;
    el.style.backgroundColor = bgColor;
    el.style.border = border;
    el.style.transform = `scale(${scale})`;
  }
}
