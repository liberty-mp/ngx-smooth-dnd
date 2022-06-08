import { Component, ContentChildren, QueryList, ViewChild, ElementRef, AfterViewInit, NgZone, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { dropHandlers, smoothDnD, ContainerOptions,  SmoothDnD, SmoothDnDCreator, DragStartParams, DragEndParams } from '@libertymp/smooth-dnd';
import { DraggableComponent } from './draggable.component';
import { DropResult } from './types';

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
smoothDnD.wrapChild = false;

@Component({
  selector: 'smooth-dnd-container',
  template: `
    <div #dnd>
      <ng-content></ng-content>
    </div>
  `,
})
export class ContainerComponent implements OnDestroy, AfterViewInit {
  @ContentChildren(DraggableComponent) draggables!: QueryList<DraggableComponent>;
  @ViewChild('dnd', { static: true }) containerElementRef!: ElementRef;

  @Input("behaviour") behaviour: ContainerOptions['behaviour'];
  @Input("groupName") groupName: ContainerOptions['groupName'];
  @Input('orientation') orientation: ContainerOptions['orientation'];
  @Input('dragHandleSelector') dragHandleSelector: ContainerOptions['dragHandleSelector'];
  @Input('nonDragAreaSelector') nonDragAreaSelector: ContainerOptions['nonDragAreaSelector'];
  @Input('dragBeginDelay') dragBeginDelay: ContainerOptions['dragBeginDelay'];
  @Input('animationDuration') animationDuration: ContainerOptions['animationDuration'];
  @Input('autoScrollEnabled') autoScrollEnabled: ContainerOptions['autoScrollEnabled'];
  @Input('lockAxis') lockAxis: ContainerOptions['lockAxis'];

  @Input('dragClass') dragClass: ContainerOptions['dragClass'];
  @Input('dropClass') dropClass: ContainerOptions['dropClass'];
  @Input('dropPlaceholder') dropPlaceholder: ContainerOptions['dropPlaceholder'];
  @Input('removeOnDropOut') removeOnDropOut: ContainerOptions['removeOnDropOut'];
  @Input('useTransformForGhost') useTransformForGhost: SmoothDnDCreator['useTransformForGhost'];

  @Output() dragEnter = new EventEmitter();
  @Output() dragLeave = new EventEmitter();

  @Output() dragStart = new EventEmitter<DragStartParams>();
  @Output() dragEnd = new EventEmitter<DragEndParams>();
  @Output() drop = new EventEmitter<DropResult>();
  @Output() dropReady = new EventEmitter();

  @Input() getChildPayload: ContainerOptions['getChildPayload'];
  @Input() shouldAnimateDrop: ContainerOptions['shouldAnimateDrop'];
  @Input() shouldAcceptDrop: ContainerOptions['shouldAcceptDrop'];
  @Input() getGhostParent: ContainerOptions['getGhostParent'];

  private container!: SmoothDnD;

  public constructor(private readonly ngZone: NgZone) {}

  public ngAfterViewInit() {
    if (this.useTransformForGhost) {
      smoothDnD.useTransformForGhost = this.useTransformForGhost;
    }

    this.container = smoothDnD(this.containerElementRef.nativeElement, this.getOptions());
  }

  ngOnDestroy() {
    this.container.dispose();
  }

  private getOptions(): ContainerOptions {
    const options: ContainerOptions = {};

    if (this.behaviour) {
      options.behaviour = this.behaviour;
    }

    if (this.groupName) {
      options.groupName = this.groupName;
    }

    if (this.orientation) {
      options.orientation = this.orientation;
    }

    if (this.dragHandleSelector) {
      options.dragHandleSelector = this.dragHandleSelector;
    }

    if (this.nonDragAreaSelector) {
      options.nonDragAreaSelector = this.nonDragAreaSelector;
    }

    if (this.dragBeginDelay) {
      options.dragBeginDelay = this.dragBeginDelay;
    }

    if (this.animationDuration) {
      options.animationDuration = this.animationDuration;
    }

    if (this.autoScrollEnabled) {
      options.autoScrollEnabled = this.autoScrollEnabled;
    }

    if (this.lockAxis) {
      options.lockAxis = this.lockAxis;
    }

    if (this.dragClass) {
      options.dragClass = this.dragClass;
    }

    if (this.dropClass) {
      options.dropClass = this.dropClass;
    }

    if (this.dropPlaceholder) {
      options.dropPlaceholder = this.dropPlaceholder;
    }

    if (this.removeOnDropOut) {
      options.removeOnDropOut = this.removeOnDropOut;
    }

    if (this.dragStart) {
      options.onDragStart = (params: DragStartParams) => {
        this.runNgZone(() => {
          this.dragStart.emit(params);
        });
      }
    }

    if (this.dragEnd) {
      options.onDragEnd = (params: DragEndParams) => {
        this.runNgZone(() => {
          this.dragEnd.emit(params);
        });
      }
    }

    if (this.drop) {
      // @ts-ignore
      options.onDrop = ({ whereComeFrom, addedIndex, payload, origin }: DropResult) => {
        this.runNgZone(() => {
          if(addedIndex === null) {
            return;
          }

          this.drop.emit({ from: whereComeFrom, to: addedIndex, payload, origin });
        });
      }
    }

    if (this.dragEnter) {
      options.onDragEnter = () => {
        this.runNgZone(() => {
          this.dragEnter.emit();
        });
      }
    }

    if (this.dragLeave) {
      options.onDragLeave = () => {
        this.runNgZone(() => {
          this.dragLeave.emit();
        });
      }
    }

    if (this.dropReady) {
      options.onDropReady = () => {
        this.runNgZone(() => {
          this.dropReady.emit();
        });
      }
    }

    if(this.getChildPayload) {
      options.getChildPayload = this.getChildPayload;
    }

    if(this.shouldAnimateDrop) {
      options.shouldAnimateDrop = this.shouldAnimateDrop;
    }

    if(this.shouldAcceptDrop) {
      options.shouldAcceptDrop = this.shouldAcceptDrop;
    }

    if(this.getGhostParent) {
      options.getGhostParent = this.getGhostParent;
    }

    return options;
  }

  private runNgZone(fn: () => void) {
    this.ngZone.run(() => {
      fn();
    });
  }
}
