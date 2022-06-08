import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { constants } from '@libertymp/smooth-dnd';

@Component({
  selector: 'smooth-dnd-draggable',
  template: `
    <ng-container #draggableWrapper>
      <ng-content></ng-content>
    </ng-container>
  `,
})
export class DraggableComponent implements AfterViewInit {
  @ViewChild('draggableWrapper', { static: true }) wrapper!: ElementRef<any>;

  public constructor() {}

  public ngAfterViewInit() {
    this.wrapper.nativeElement.parentNode.className = constants.wrapperClass;
  }
}
