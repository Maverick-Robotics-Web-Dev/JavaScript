import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToPayMainComponent } from './way-to-pay-main.component';

describe('WayToPayMainComponent', () => {
  let component: WayToPayMainComponent;
  let fixture: ComponentFixture<WayToPayMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WayToPayMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WayToPayMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
