import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToPayCreateComponent } from './way-to-pay-create.component';

describe('WayToPayCreateComponent', () => {
  let component: WayToPayCreateComponent;
  let fixture: ComponentFixture<WayToPayCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WayToPayCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WayToPayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
