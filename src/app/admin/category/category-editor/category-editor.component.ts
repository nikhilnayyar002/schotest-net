import { Component, OnInit } from '@angular/core';
import * as DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import config from 'src/data/config';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
