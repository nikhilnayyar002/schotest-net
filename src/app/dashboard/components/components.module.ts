import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCardComponent } from './test-card/test-card.component';
import { RouterModule } from '@angular/router';
import { CategoryCardsComponent } from './category-cards/category-cards.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TestCardComponent, CategoryCardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[TestCardComponent, CategoryCardsComponent]
})
export class ComponentsModule { }
