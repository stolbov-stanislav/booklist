import { Component, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService, Book } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { liveQuery } from 'dexie';

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

  public authors!: Observable<Book[`author`][]>;
  public isActionCompleted = false;
  public actionResult: 'danger' | 'success' | 'warning' = 'danger';

  constructor(
    public formBuilder: FormBuilder,
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
    this.authors = from(liveQuery(() => this.data.getAuthors()));
  } 

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Books' : '';
  }

  submitCreationForm = async () => {
    this.isActionCompleted = false;
    const author = this.authorCreationForm.value.author;
    if (author) {
      try {
        await this.data.addAuthor(author);
        this.isActionCompleted = !this.isActionCompleted;
        this.actionResult = 'success';
      }
      catch (e) {
        this.actionResult = 'danger';
      }
    }
  };

  submitEditionForm = () => {
    this.isActionCompleted = false;
    const author = this.authorEditionForm.value.author;
    const newAuthor = this.authorEditionForm.value.newAuthor;
    if (author && newAuthor) {
      this.data.editAuthor(author, newAuthor);
      this.isActionCompleted = !this.isActionCompleted;
      this.actionResult = 'warning';
    }
  };
}
