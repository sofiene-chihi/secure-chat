import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdGeneratorComponent } from './id-generator.component';

describe('IdGeneratorComponent', () => {
  let component: IdGeneratorComponent;
  let fixture: ComponentFixture<IdGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
