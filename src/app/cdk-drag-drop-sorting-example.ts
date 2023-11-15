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
  idxList: any[];
  ChildidxList: any[];
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
    this.processSelectedPositions(jobIndex);
  }

  private processSelectedPositions(jobIndex: number) {
    const isSelectPosition = this.positions.filter((x) => x.isSelect === true);
    for (let idx of this.idxList) {
      transferArrayItem(
        isSelectPosition,
        this.jobList[jobIndex].children,
        idx,
        idx
      );
    }
    this.positions = this.positions.filter((item) => item.isSelect !== true);
  }

  onJobSelected(): void {
    // Get the index of the selected position
    this.idxList = this.findSelectedIndex(this.positions);
  }
  onJobChildSelected(item:any[]){
this.ChildidxList=this.findSelectedIndex(item);
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
}
