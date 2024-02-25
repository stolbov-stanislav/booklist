import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EditAuthorPageRoutingModule } from './edit-author-routing.module';
import { EditAuthorPage } from './edit-author.page';

describe('EditAuthorPage', () => {
  let component: EditAuthorPage;
  let fixture: ComponentFixture<EditAuthorPage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [EditAuthorPage],
      imports: [IonicModule.forRoot(), EditAuthorPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
