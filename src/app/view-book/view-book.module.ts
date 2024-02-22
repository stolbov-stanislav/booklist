import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewBookPage } from './view-book.page';

import { IonicModule } from '@ionic/angular';

import { ViewBookPageRoutingModule } from './view-book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBookPageRoutingModule
  ],
  declarations: [ViewBookPage]
})
export class ViewBookPageModule {}
