import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AihelpComponent } from './aihelp.component';

describe('AihelpComponent', () => {
  let component: AihelpComponent;
  let fixture: ComponentFixture<AihelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AihelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AihelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
