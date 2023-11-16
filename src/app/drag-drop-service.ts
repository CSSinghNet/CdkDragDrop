import { Injectable } from '@angular/core';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  dropJob(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateObjectInArray(array:any, keyToUpdate:string, newValue:boolean) {
    return array.map((obj:any) => {
        // Check if the object has a 'children' property
        if (obj.children && Array.isArray(obj.children)) {
            // If yes, update the nested object
            obj.children = obj.children.map((nestedObj:any) => {
                // If yes, create a new nested object with the updated key-value pair
                return { ...nestedObj, [keyToUpdate]: newValue };
            });
        } else {
            // If no 'children' property, update the object directly
            return { ...obj, [keyToUpdate]: newValue };
        }
        // Return the original object (with or without changes)
        return obj;
    });
  }
}
