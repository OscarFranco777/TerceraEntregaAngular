import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TrackingService } from './services/tracking.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'angular-wishlist';
  idiomaActual = 'es';

  constructor(
    private translate: TranslateService,
    private trackingService: TrackingService
  ) {
    translate.use('es');
  }

  ngOnInit(): void {
    this.trackingService.startTracking();
  }

  cambiarIdioma(lang: string): void {
    this.translate.use(lang);
    this.idiomaActual = lang;
  }
}
