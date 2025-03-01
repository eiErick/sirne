import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPostDialogComponent } from './publish-post-dialog.component';

describe('PublishPostDialogComponent', () => {
  let component: PublishPostDialogComponent;
  let fixture: ComponentFixture<PublishPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishPostDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
