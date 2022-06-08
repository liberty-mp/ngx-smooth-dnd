import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { constants } from '@libertymp/smooth-dnd';

@Component({
  selector: 'smooth-dnd-draggable',
  template: `
    <ng-container #draggableWrapper>
      <ng-content></ng-content>
    </ng-container>
  `,
  styles: [`
    .dndDraggableDisabled {
      cursor: not-allowed;
    }
  `]
})
export class DraggableComponent implements AfterViewInit, OnChanges {
  @ViewChild('draggableWrapper', { static: true }) wrapper!: ElementRef<any>;

  @Input("draggable")
  public draggable = true;

  public constructor() {}

  public ngAfterViewInit() {
    this.wrapper.nativeElement.parentNode.className = constants.wrapperClass;

    if(this.draggable) {
      this.wrapper.nativeElement.parentNode.classList.remove('dndDraggableDisabled');
    }
    else {
      this.wrapper.nativeElement.parentNode.classList.add('dndDraggableDisabled');
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    changes['draggable'].currentValue ? this.wrapper.nativeElement.parentNode.classList.remove('dndDraggableDisabled') : this.wrapper.nativeElement.parentNode.classList.add('dndDraggableDisabled');
  }
}
