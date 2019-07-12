import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McqPageComponent } from './mcq-page/mcq-page.component';
import { OverallTestDetailComponent } from './overall-test-detail/overall-test-detail.component';
import { FormsModule} from '@angular/forms'
import { McqStatesComponent } from './mcq-states/mcq-states.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [McqPageComponent, OverallTestDetailComponent, McqStatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports:[McqPageComponent, OverallTestDetailComponent, McqStatesComponent]
})
export class ComponentsModule { }
