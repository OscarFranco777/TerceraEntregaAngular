import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule, FormGroup, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { Resaltar } from '../directives/resaltar';

// Variable parametrizable
const MIN_LOG_NOMBRE = 5;

// Validador parametrizable: recibe el mínimo y retorna una función validadora
function minLogNombreValidator(minLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || value.length === 0) {
      return null; // lo maneja Validators.required
    }
    return value.length >= minLength
      ? null
      : { minLogNombre: { requiredLength: minLength, actualLength: value.length } };
  };
}

// Validador personalizado: nombre inválido (solo letras, espacios y acentos)
function nombreValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value || value.length === 0) {
    return null;
  }
  const regex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
  return regex.test(value) ? null : { invalidNombre: true };
}

// Interfaz para los lugares del JSON
interface LugarTuristico {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, Resaltar],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css'
})
export class FormDestinoViajeComponent implements AfterViewInit, OnDestroy {
  fg: FormGroup;
  searchResults: LugarTuristico[] = [];  // sugerencias del autocomplete
  private subscription: Subscription = new Subscription();

  @ViewChild('nombreInput') nombreInput!: ElementRef<HTMLInputElement>;
  @Output() onItemAdded = new EventEmitter<{ nombre: string; url: string }>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.fg = this.fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        nombreValidator,
        minLogNombreValidator(MIN_LOG_NOMBRE)
      ])],
      url: ['']
    });
  }

  ngAfterViewInit(): void {
    // Vincular fromEvent al input 'nombre' con evento 'input'
    const inputEvent$ = fromEvent<InputEvent>(this.nombreInput.nativeElement, 'input');

    const subscription = inputEvent$.pipe(
      // Obtener el valor del input
      map((event: InputEvent) => (event.target as HTMLInputElement).value),
      // Solo proceder si tiene 4 o más caracteres
      filter((texto: string) => texto.length >= 4),
      // Esperar 200ms de debounce
      debounceTime(200),
      // Solo emitir si el valor cambió
      distinctUntilChanged(),
      // Cancelar request anterior y hacer el HTTP al JSON
      switchMap((texto: string) => {
        return this.http.get<LugarTuristico[]>('assets/datos.json').pipe(
          map((lugares: LugarTuristico[]) => {
            // Filtrar los lugares que contengan el texto escrito
            const textoLower = texto.toLowerCase();
            return lugares.filter(l => l.nombre.toLowerCase().includes(textoLower));
          })
        );
      })
    ).subscribe((resultados: LugarTuristico[]) => {
      this.searchResults = resultados;
    });

    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  seleccionarSugerencia(lugar: LugarTuristico): void {
    // Poner el nombre del lugar en el campo del formulario
    this.fg.patchValue({ nombre: lugar.nombre });
    // Limpiar las sugerencias
    this.searchResults = [];
  }

  agregar(): void {
    const nombre = this.fg.get('nombre')?.value;
    const url = this.fg.get('url')?.value;
    if (nombre && nombre.trim().length > 0) {
      this.onItemAdded.emit({ nombre: nombre.trim(), url: url || '' });
      this.fg.reset();
      this.searchResults = [];
    }
  }
}
