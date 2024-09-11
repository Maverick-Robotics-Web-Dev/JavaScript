import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToPayIdComponent } from './way-to-pay-id.component';

describe('WayToPayIdComponent', () => {
  let component: WayToPayIdComponent;
  let fixture: ComponentFixture<WayToPayIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WayToPayIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WayToPayIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
