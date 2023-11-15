import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { moveItemsInArray } from './moveItemsInArray';

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
  ];

  @ViewChild('openDialog') openDialog: TemplateRef<any>;
  jobTitle: string;
  constructor(private dialog: MatDialog) {}

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.positions, event.previousIndex, event.currentIndex);
  }

  dropJob(event: CdkDragDrop<any>) {
    moveItemInArray(this.jobList, event.previousIndex, event.currentIndex);
  }
  AddJob() {
    const dialogRef = this.dialog.open(this.openDialog);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  save() {
    this.jobList = this.jobList || [];
    this.jobList.push({
      name: this.jobTitle,
      isSelect: false,
      children: [],
    });

    this.jobTitle = '';
    this.dialog.closeAll();
    console.log(this.jobList);
  }

  onUpClick() {
    console.log(this.jobList);
    this.jobList = this.idxList.map((idx) => {
      const selectedItem = this.positions[idx];
      selectedItem.isSelect = !selectedItem.isSelect;
      return selectedItem;
    });

    this.positions = this.positions.filter((obj) => !obj.isSelect);
  }

  onDownClick() {}

  onJobSelected(index: number): void {
    this.idxList = this.idxList || []; // Ensure idxList is initialized
    this.selectedJobIndex = index;
    if (!this.idxList.includes(index)) {
      this.idxList.push(index);
    }
  }
}
