import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SourceService } from 'src/app/services/source.service';

interface ItemData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {
  listOfData: ItemData[] = [];
  isModalVisible: boolean = false;
  sourceName: string = null;
  sourceId: number = null;

  constructor(private sourceService: SourceService, private modal: NzModalService) { }

  ngOnInit() {
    this.refreshTable();
  }

  /**
   * Request the sources to fill the table
   */
  refreshTable(): void {
    this.sourceService.getSources().subscribe((resp)=> {
      this.listOfData = resp;
    });
  }

  /**
   * Shows the modal to edit the name of the source
   * @param id Id of the source to edit
   */
  editSource(id: number): void {
    this.sourceId = id;
    this.sourceName = this.listOfData.find(x=>x.id == id).name;
    this.isModalVisible = true;
  }

  /**
   * Saves the source whether its an existing or a new one
   */
  saveSource(){
    if(this.sourceId){
      this.sourceService.updateSource(this.sourceId, this.sourceName).subscribe(x=>{
        this.refreshTable();
        this.handleCancelModal();
      });
    }else {
      this.sourceService.createSource(this.sourceName).subscribe(x=>{
        this.refreshTable();
        this.handleCancelModal();
      });
    }
  }

  /**
   * Deletes the source with the id
   * @param id Id of the source to be deleted
   */
  deleteSource(id: number): void {
    this.modal.confirm({
      nzTitle: '<i>Are you sure you want to delete this source?</i>',
      nzContent: '<b>Please make sure that it isn\'t connected to no indicator, otherwise it can\'t be deleted </b>',
      nzOnOk: () => {
        this.sourceService.deleteSource(id).subscribe(x=>{
          this.refreshTable();
        })
      }
    });
  }

  /**
   * Handler of when pressed on cancel button of modal
   * Closes the modal
   */
  handleCancelModal(): void {
    this.sourceId = null;
    this.sourceName = null;
    this.isModalVisible = false;
  }
}
