import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisponibilitePage } from './disponibilite.page';

describe('DisponibilitePage', () => {
  let component: DisponibilitePage;
  let fixture: ComponentFixture<DisponibilitePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DisponibilitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
