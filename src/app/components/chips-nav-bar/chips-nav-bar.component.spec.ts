import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsNavBarComponent } from './chips-nav-bar.component';

describe('ChipsNavBarComponent', () => {
  let component: ChipsNavBarComponent;
  let fixture: ComponentFixture<ChipsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
