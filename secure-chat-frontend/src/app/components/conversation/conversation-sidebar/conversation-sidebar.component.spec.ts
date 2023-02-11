import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationSidebarComponent } from './conversation-sidebar.component';

describe('ConversationSidebarComponent', () => {
  let component: ConversationSidebarComponent;
  let fixture: ComponentFixture<ConversationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
