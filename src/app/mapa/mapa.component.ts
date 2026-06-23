import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  standalone: true,
  template: `
    <div class="container mt-4">
      <h2 class="mb-3">🗺️ Mapa de Destinos</h2>
      <p class="text-muted mb-3">Mapa con estilo personalizado (GeoJSON) — sin token de Mapbox.</p>
      <div class="map-container" #mapContainer></div>
    </div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 500px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
    }
  `]
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map!: mapboxgl.Map;

  // Estilo personalizado con GeoJSON — no necesita token de Mapbox
  private style = {
    sources: {
      world: {
        type: 'geojson' as const,
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: this.style as any,
      center: [-58.3816, -34.6037], // Buenos Aires
      zoom: 3,
      accessToken: 'pk.placeholder' // Token dummy — solo usamos GeoJSON propio
    });

    // Marker con popup al hacer click
    const marker = new mapboxgl.Marker({ color: '#E74C3C' })
      .setLngLat([-58.3816, -34.6037])
      .addTo(this.map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h5>📍 Buenos Aires</h5><p>Capital de Argentina</p>');

    marker.setPopup(popup);

    // También se puede abrir el popup al hacer click en el marker
    marker.getElement().addEventListener('click', () => {
      popup.addTo(this.map);
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
