import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmPopupComponent } from './delete-confirm-popup.component';

describe('DeleteConfirmPopupComponent', () => {
  let component: DeleteConfirmPopupComponent;
  let fixture: ComponentFixture<DeleteConfirmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
