import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SourceService } from 'src/app/services/source.service';

interface ItemData {
  id: string;
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

  refreshTable(): void {
    this.sourceService.getSources().subscribe((resp)=> {
      this.listOfData = resp;
    });
  }

  editSource(id: number): void {
    this.sourceId = id;
    this.isModalVisible = true;
  }

  saveSource(){
    if(this.sourceId){
      this.sourceService.updateSource(this.sourceId, this.sourceName).subscribe(x=>{
        this.refreshTable();
      });
    }else {
      this.sourceService.createSource(this.sourceName).subscribe(x=>{
        this.refreshTable();
      });
    }
  }

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

  handleCancelModal(): void {
    this.sourceId = null;
    this.isModalVisible = false;
  }
}
