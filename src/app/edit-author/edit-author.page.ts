import { Component, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService, Book } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.page.html',
  styleUrls: ['./edit-author.page.scss'],
})
export class EditAuthorPage {
  private data = inject(DataService);
  private platform = inject(Platform);

  public authorCreationForm: FormGroup;
  public authorEditionForm: FormGroup;

  public authors: Book[`author`][] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.authorCreationForm = this.formBuilder.group({
      author: [],
    });
    this.authorEditionForm = this.formBuilder.group({
      author: [],
      newAuthor: [],
    });
    this.initAsyncProperties();
  }

  async initAsyncProperties() {
    this.authors = await this.data.getAuthors();
  } 

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Books' : '';
  }

  submitCreationForm = () => {
    const author = this.authorCreationForm.value.author;
    if (author) {
      this.data.addAuthor(author);
      this.router.navigate(['/']);
    }
  };

  submitEditionForm = () => {
    const author = this.authorEditionForm.value.author;
    const newAuthor = this.authorEditionForm.value.newAuthor;
    if (author && newAuthor) {
      this.data.editAuthor(author, newAuthor);
      this.router.navigate(['/']);
    }
  };
}
