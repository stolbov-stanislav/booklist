import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ViewBookPageRoutingModule } from './view-book-routing.module';
import { ViewBookPage } from './view-book.page';

describe('ViewBookPage', () => {
  let component: ViewBookPage;
  let fixture: ComponentFixture<ViewBookPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ViewBookPage],
      imports: [IonicModule.forRoot(), ViewBookPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
