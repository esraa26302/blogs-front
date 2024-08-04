import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommenteditpopupComponent } from './commenteditpopup.component';

describe('CommenteditpopupComponent', () => {
  let component: CommenteditpopupComponent;
  let fixture: ComponentFixture<CommenteditpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommenteditpopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommenteditpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
