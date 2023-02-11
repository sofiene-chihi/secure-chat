import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { IdGeneratorComponent } from './components/home/id-generator/id-generator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ShareIdModalComponent } from './components/home/share-id-modal/share-id-modal.component';
import { InviteFriendModalComponent } from './components/home/invite-friend-modal/invite-friend-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ConversationSidebarComponent } from './components/conversation/conversation-sidebar/conversation-sidebar.component';
import { ConversationBoxComponent } from './components/conversation/conversation-box/conversation-box.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideProfileComponent } from './components/conversation/conversation-sidebar/side-profile/side-profile.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AddProfileComponent } from './components/conversation/conversation-sidebar/add-profile/add-profile.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { InvitationModalComponent } from './components/home/invitation-modal/invitation-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MessagesComponent } from './components/conversation/conversation-box/messages/messages.component';
import { MessageItemComponent } from './components/conversation/conversation-box/messages/message-item/message-item.component';
import { QuitModalComponent } from './components/conversation/quit-modal/quit-modal.component';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.baseUrl;

const config: SocketIoConfig = {
  url: BASE_URL,
  options: {
    transports: ['websocket'],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    IdGeneratorComponent,
    ShareIdModalComponent,
    InviteFriendModalComponent,
    ConversationComponent,
    ConversationSidebarComponent,
    ConversationBoxComponent,
    SideProfileComponent,
    AddProfileComponent,
    InvitationModalComponent,
    MessagesComponent,
    MessageItemComponent,
    QuitModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule,
    NgScrollbarModule,
    SocketIoModule.forRoot(config),
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
