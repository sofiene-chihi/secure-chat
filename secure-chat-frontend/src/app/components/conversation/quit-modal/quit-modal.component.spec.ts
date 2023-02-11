import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitModalComponent } from './quit-modal.component';

describe('QuitModalComponent', () => {
  let component: QuitModalComponent;
  let fixture: ComponentFixture<QuitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuitModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
