import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataService, Book } from '../services/data.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.page.html',
  styleUrls: ['./view-book.page.scss'],
})
export class ViewBookPage implements OnInit {
  public book?: Book;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.book = await this.data.getBookById(parseInt(id, 10));
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Books' : '';
  }
}
