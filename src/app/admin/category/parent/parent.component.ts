import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../modals/category';
import { MainService } from '../../main.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GLobalState } from 'src/app/shared/global.state';
import config from 'src/data/config';

import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent  {

  config = config
  constructor(
    private route:ActivatedRoute
  ) {}

/**
 * CK Editor
 * 
 * IMPORT:
 *  import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
 * 
 * HTML:
 *      <ckeditor [(ngModel)]="editorModal" [editor]="editor" (ready)="onReady($event)"
 *       [config]="editorConfig">
 *      </ckeditor>
 * 
 * CODE:
 */
  editor = DocumentEditor
  editorModal:string = '';
  editorConfig = config.ckEditor.config
  onReady(editor): void {
    // console.log(Array.from( editor.ui.componentFactory.names() ))
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }
  



}

