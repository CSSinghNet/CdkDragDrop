import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DragDropService } from './drag-drop-service';
import { PositionService } from './position-service';

/**
 * @title Drag&Drop sorting
 */
@Component({
  selector: 'cdk-drag-drop-sorting-example',
  templateUrl: 'cdk-drag-drop-sorting-example.html',
  styleUrls: ['cdk-drag-drop-sorting-example.css'],
})
export class CdkDragDropSortingExample  implements OnInit{
  selectedJobIndex: number;
  jobList: any[]=[];
  idxList: number[]=[];
  ChildidxList: number[]=[];
  positions :any[]= [];

  @ViewChild('openDialog') openDialog: TemplateRef<any>;
  jobTitle: string;
  constructor(private dialog: MatDialog,private dragDropService:DragDropService, 
    private positionService:PositionService) {}

  ngOnInit() {
    this.positions = this.positionService.getPositions();
  }
  drop(event: CdkDragDrop<any>) {
    this.dragDropService.drop(event);
  }

  dropJob(event: CdkDragDrop<any>) {
    this.dragDropService.dropJob(event);
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
    this.positions = this.dragDropService.updateObjectInArray(this.positions,'isSelect', false); 
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
      this.jobList = this.dragDropService.updateObjectInArray(this.jobList,'isSelect', false);       
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
}
