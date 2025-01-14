import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCategoryComponent } from './feature-category.component';

describe('FeatureCategoryComponent', () => {
  let component: FeatureCategoryComponent;
  let fixture: ComponentFixture<FeatureCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
