import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { constants } from 'smooth-dnd';

@Component({
  selector: 'smooth-dnd-draggable',
  template: `
    <div #draggableWrapper>
      <ng-content></ng-content>
    </div>
  `,
})
export class DraggableComponent implements AfterViewInit {
  @ViewChild('draggableWrapper', { static: true }) wrapper!: ElementRef<any>;

  public constructor() {}

  public ngAfterViewInit() {
    this.wrapper.nativeElement.parentNode.className = constants.wrapperClass;
  }
}
