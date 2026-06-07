import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoViajeCard } from './destino-viaje-card';

describe('DestinoViajeCard', () => {
  let component: DestinoViajeCard;
  let fixture: ComponentFixture<DestinoViajeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoViajeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoViajeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
