import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5featuresComponent } from './html5features.component';

describe('Html5featuresComponent', () => {
  let component: Html5featuresComponent;
  let fixture: ComponentFixture<Html5featuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Html5featuresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Html5featuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
