import { Component, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService, Book } from '../services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage {
  private data = inject(DataService);
  private platform = inject(Platform);

  public bookCreationForm: FormGroup;
  public isBookCreationFormValid = true;
  public authors = this.data.getAuthors();
  public languages = new Set(this.data.getBooks().map((d) => d.language));

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.bookCreationForm = this.formBuilder.group({
      title: [],
      author: [],
      description: [],
      pagesCount: [],
      language: [],
      genre: [],
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Books' : '';
  }

  submitCreationForm = () => {
    this.isBookCreationFormValid = !Object.values(this.bookCreationForm.value).some((v) => v === null);
    if (this.isBookCreationFormValid) {
      this.data.addBook({
        ...this.bookCreationForm.value,
      });
      this.router.navigate(['/']);
    }
  };
}
