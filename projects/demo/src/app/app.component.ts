import { Component } from '@angular/core';
import { DropResult } from '@libertymp/ngx-smooth-dnd';

export const applyDrag = (arr: any, dragResult: any) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0];
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};

export const generateItems = (count: any, creator: any) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(creator(i));
	}
	return result;
};

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div [ngClass]="{'scale-75': scale}"  class="simple-page">
        <button (click)="toggleScale()">Scale</button>
        <smooth-dnd-container [groupName]="'1'" (drop)="onDropOne($event)" [behaviour]="'copy'">
          <smooth-dnd-draggable *ngFor="let item of items" [draggable]="true">
            <div class="draggable-item">
              {{item.data}}
            </div>
          </smooth-dnd-draggable>
        </smooth-dnd-container>

        <smooth-dnd-container [groupName]="'2'" (drop)="onDropTwo($event)" [behaviour]="'copy'">
          <smooth-dnd-draggable *ngFor="let item of items" [draggable]="true">
            <div class="draggable-item">
              {{item.data}}
            </div>
          </smooth-dnd-draggable>
        </smooth-dnd-container>
      </div>
    </div>
  `
})
export class AppComponent {
  items = generateItems(50, (i: number) => ({ data: 'Draggable ' + i }))

  scale = false;

  public toggleScale() {
    this.scale = !this.scale;
  }

  onDropOne(dropResult: DropResult) {
    // update item list according to the @dropResult
    // this.items = applyDrag(this.items, dropResult);

    // @ts-ignore
    console.log('onDropOne', dropResult);
  }

  onDropTwo(dropResult: DropResult) {
    // update item list according to the @dropResult
    // this.items = applyDrag(this.items, dropResult);
    // @ts-ignore

    console.log('onDropTwo', dropResult);
  }
}
