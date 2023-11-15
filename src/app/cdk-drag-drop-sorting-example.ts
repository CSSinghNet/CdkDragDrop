import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'cdk-drag-drop-sorting-example.html',
  styleUrls: ['cdk-drag-drop-sorting-example.css'],
})
export class CdkDragDropSortingExample {
  selectedJobIndex: number;
  jobList: any[];
  idxList: number[]=[];
  ChildidxList: number[]=[];
  positions = [
    {
      name: 'Position 1',
      isSelect: false,
    },

    {
      name: 'Position 2',
      isSelect: false,
    },
    {
      name: 'Position 3',
      isSelect: false,
    },
    {
      name: 'Position 4',
      isSelect: false,
    },
    {
      name: 'Position 5',
      isSelect: false,
    },
    {
      name: 'Position 6',
      isSelect: false,
    },
    {
      name: 'Position 7',
      isSelect: false,
    },
    {
      name: 'Position 8',
      isSelect: false,
    },
    {
      name: 'Position 9',
      isSelect: false,
    },
    {
      name: 'Position 10',
      isSelect: false,
    },
    {
      name: 'Position 11',
      isSelect: false,
    },
    {
      name: 'Position 12',
      isSelect: false,
    },
    {
      name: 'Position 13',
      isSelect: false,
    },
    {
      name: 'Position 14',
      isSelect: false,
    },
    {
      name: 'Position 15',
      isSelect: false,
    },
  ];

  @ViewChild('openDialog') openDialog: TemplateRef<any>;
  jobTitle: string;
  constructor(private dialog: MatDialog) {}

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.positions, event.previousIndex, event.currentIndex);
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
  AddJob() {
    this.dialog.open(this.openDialog);
  }

  save() {
    this.jobList = this.jobList || [];
    this.jobList.push({
      name: this.jobTitle.toLocaleUpperCase(),
      isSelect: false,
      children: [],
    });

    this.jobTitle = '';
    this.dialog.closeAll();
  }

  onUpClick(jobIndex: number) {
    this.processSelectedPositions(jobIndex);
  }

  onDownClick(jobIndex: number) {
    for(const idx of this.ChildidxList){
      transferArrayItem(this.jobList[jobIndex].children,this.positions, idx, idx);
    }
    this.positions = this.updateObjectInArray(this.positions,'isSelect', false); 
  }

  private processSelectedPositions(jobIndex: number) {
    const selectedPositions = this.positions.filter((position) => position.isSelect);
    for (const idx of this.idxList) {
      transferArrayItem(
        selectedPositions,
        this.jobList[jobIndex].children,
        idx,
        idx
        );
      this.jobList = this.updateObjectInArray(this.jobList,'isSelect', false);       
    }
    this.positions = this.positions.filter((position) => !position.isSelect);
  }
  

  onJobSelected(): void {
    // Get the index of the selected position
    this.idxList = this.findSelectedIndex(this.positions);
  }
  onJobChildSelected(array:any){
   this.ChildidxList=this.findSelectedIndex(array);
  }

  findSelectedIndex(array: any[]) {
    this.idxList = []; // Ensure idxList is initialized
    array.forEach((position, index) => {
      if (position.isSelect) {
        this.idxList.push(index);
      }
    });
    return this.idxList;
  }

  findJobSelectedIndex(array: any[]) {
    // Reset idxList before processing the array
    this.ChildidxList = [];
    array.forEach((position, index) => {
      if (position.isSelect) {
        this.ChildidxList.push(index);
      }
    });
  
    return this.ChildidxList;
  }

  delete(indextoDelete:number){
   this.jobList= this.jobList.filter((_, index) => index !== indextoDelete);
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
