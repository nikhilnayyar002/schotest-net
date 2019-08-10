
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageModule } from './page/page.module';
import { PageSwitchDirective } from './page-switch.directive';
import { McqsComponent } from './page/mcqs/mcqs.component';
import { QuestionsComponent } from './page/questions/questions.component';
import { InstructionsComponent } from './page/instructions/instructions.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestEffect } from './state/state.effects';
import { AmplitudeTestRoutingModule } from './amplitude-test-routing.module';
import { ParentComponent } from './parent/parent.component';
import { SharedModule } from '../shared/shared.module';
import { tReducer, oReducer } from './state/state.reducer';
import { AmplitudeTestResolverService } from './guard/amplitude-test.resolver';
import { MainService } from './main.service';
import { InstructionComponent } from './instruction/instruction.component';

@NgModule({
  declarations: [
    ParentComponent,
    PageSwitchDirective,
    InstructionComponent
  ],
  imports: [
    BrowserModule,
    AmplitudeTestRoutingModule,
    PageModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,

    StoreModule.forFeature('test', tReducer),
    StoreModule.forFeature('testOther', oReducer),    
    /**
     * Effects
     */
    EffectsModule.forFeature([TestEffect])
  ],
  providers:[AmplitudeTestResolverService, TestEffect, MainService],
  entryComponents:[McqsComponent,QuestionsComponent,InstructionsComponent]
})
export class AmplitudeTestModule { }
