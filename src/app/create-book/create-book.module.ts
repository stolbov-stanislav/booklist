import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBookPage } from './create-book.page';

import { IonicModule } from '@ionic/angular';

import { CreateBookPageRoutingModule } from './create-book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreateBookPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateBookPage]
})
export class CreateBookPageModule {}
