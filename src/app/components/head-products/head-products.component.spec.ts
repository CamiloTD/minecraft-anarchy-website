import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadProductsComponent } from './head-products.component';

describe('HeadProductsComponent', () => {
  let component: HeadProductsComponent;
  let fixture: ComponentFixture<HeadProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
