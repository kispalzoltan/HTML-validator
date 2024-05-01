import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRuleGroupCreatorComponent } from './own-rule-group-creator.component';

describe('OwnRuleGroupCreatorComponent', () => {
  let component: OwnRuleGroupCreatorComponent;
  let fixture: ComponentFixture<OwnRuleGroupCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnRuleGroupCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnRuleGroupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
