import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAuthorPage } from './edit-author.page';

const routes: Routes = [
  {
    path: '',
    component: EditAuthorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAuthorPageRoutingModule {}
