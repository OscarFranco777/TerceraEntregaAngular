export type Servicio = 'wifi' | 'servicios' | 'piscina' | 'desayuno';

export class DestinoViaje {
	nombre: String;
	imagenUrl: String;
	preferred: boolean;
	servicio: Servicio;
	votos: number;

	constructor(n: string, u: string, s: Servicio = 'wifi') {
	  this.nombre = n;
	  this.imagenUrl = u;
	  this.preferred = false;
	  this.servicio = s;
	  this.votos = 0;
	}

	get imagenSegura(): string {
	  return this.imagenUrl && this.imagenUrl.trim().length > 0
	    ? this.imagenUrl.toString()
	    : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop';
	}
}