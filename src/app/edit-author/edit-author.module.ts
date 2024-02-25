import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditAuthorPage } from './edit-author.page';

import { IonicModule } from '@ionic/angular';

import { EditAuthorPageRoutingModule } from './edit-author-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditAuthorPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditAuthorPage]
})
export class EditAuthorPageModule {}
