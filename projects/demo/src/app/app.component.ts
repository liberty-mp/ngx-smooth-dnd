import { Component } from '@angular/core';
import { DropResult } from 'smooth-dnd';

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
      <div class="simple-page">
        <smooth-dnd-container (drop)="onDrop($event)">
          <smooth-dnd-draggable *ngFor="let item of items">
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

  onDrop(dropResult: DropResult) {
    // update item list according to the @dropResult
    this.items = applyDrag(this.items, dropResult);
  }
}
