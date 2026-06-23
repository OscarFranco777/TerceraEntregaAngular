import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'angular-wishlist';
  idiomaActual = 'es';

  constructor(private translate: TranslateService) {
    translate.use('es');
  }

  cambiarIdioma(lang: string): void {
    this.translate.use(lang);
    this.idiomaActual = lang;
  }
}
