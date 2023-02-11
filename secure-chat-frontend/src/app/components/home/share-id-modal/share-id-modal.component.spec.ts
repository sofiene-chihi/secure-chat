import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareIdModalComponent } from './share-id-modal.component';

describe('ShareIdModalComponent', () => {
  let component: ShareIdModalComponent;
  let fixture: ComponentFixture<ShareIdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareIdModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareIdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
