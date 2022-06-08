import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container.component';
import { DraggableComponent } from './draggable.component';

@NgModule({
  declarations: [ContainerComponent, DraggableComponent],
  imports: [CommonModule],
  exports: [ContainerComponent, DraggableComponent]
})
export class NgxSmoothDndModule { }
