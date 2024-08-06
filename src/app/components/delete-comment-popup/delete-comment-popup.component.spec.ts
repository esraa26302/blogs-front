import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommentPopupComponent } from './delete-comment-popup.component';

describe('DeleteCommentPopupComponent', () => {
  let component: DeleteCommentPopupComponent;
  let fixture: ComponentFixture<DeleteCommentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCommentPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCommentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
