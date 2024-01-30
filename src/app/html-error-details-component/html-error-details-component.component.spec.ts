import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlErrorDetailsComponentComponent } from './html-error-details-component.component';

describe('HtmlErrorDetailsComponentComponent', () => {
  let component: HtmlErrorDetailsComponentComponent;
  let fixture: ComponentFixture<HtmlErrorDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlErrorDetailsComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlErrorDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
