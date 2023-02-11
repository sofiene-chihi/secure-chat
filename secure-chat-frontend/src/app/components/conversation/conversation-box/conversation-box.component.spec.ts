import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationBoxComponent } from './conversation-box.component';

describe('ConversationBoxComponent', () => {
  let component: ConversationBoxComponent;
  let fixture: ComponentFixture<ConversationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
