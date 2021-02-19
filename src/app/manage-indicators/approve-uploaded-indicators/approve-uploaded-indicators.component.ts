import { Component, OnInit } from '@angular/core';
import { IndicatorDto } from '../utils/indicator.dto';
import { IndicatorsManagement } from '../utils/indicators-management';
import { ManageIndicatorsService } from '../../services/indicators-management/manage-indicators.service';
import { IndicatorService } from '../../services/indicator.service';
import { ApprovalDto } from '../utils/approval.dto';
import { MachineLearningService } from 'src/app/services/machinelearning.service';
import { SimilarityResponse } from 'src/app/models/similarityresponse.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-approve-uploaded-indicators',
  templateUrl: './approve-uploaded-indicators.component.html',
  styleUrls: ['./approve-uploaded-indicators.component.scss']
})
export class ApproveUploadedIndicatorsComponent extends IndicatorsManagement implements OnInit {
  allChecked = false;
  someChecked = false;
  checkedIds = new Set<number>();
  selectedIndicators: IndicatorDto[] = [];
  similarIndicators: SimilarityResponse[] = [];
  expandSet = new Set<number>();
  similarExpandSet = new Set<number>();
  threshold: number = 0.8;
  thresholdDisabled = false;
  isLoadingSimilar = true;

  constructor(
    public manageIndicatorsService: ManageIndicatorsService,
    public indicatorService: IndicatorService,
    public machineLearningService: MachineLearningService,
    public messageService: NzMessageService
  ) {
    super(manageIndicatorsService, indicatorService);
  }

  ngOnInit(): void {
    this.search(false, true);
    this.getSimilarIndicators();
  }

  updateAllChecked(checked: boolean): void {
    this.allChecked = checked;
    this.indicatorList.forEach(({id}) => this.updateCheckedIds(id, checked));
    this.refreshCheckedStatus();
  }

  select(id: number, checked: boolean): void {
    this.updateCheckedIds(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedIds(id: number, checked: boolean): void {
    if (checked) {
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.allChecked = this.checkedIds.size > 0 && this.indicatorList.every(({id}) => this.checkedIds.has(id));
    this.someChecked = this.indicatorList.some(({id}) => this.checkedIds.has(id)) && !this.allChecked;
  }

  search(reset: boolean, forApproval: boolean) {
    super.search(reset, forApproval);
    this.updateAllChecked(false);
  }

  refreshIndicatorList(refresh: boolean) {
    this.search(refresh, true);
  }

  approveSelected() {
    const approvals: ApprovalDto[] = [];
    this.checkedIds.forEach(id => approvals.push(new ApprovalDto(id, true)));
    this.manageIndicatorsService.processApprovals(approvals).subscribe( res => {
      this.search(true, true);
    });
  }

  disapproveSelected() {
    const disapprovals: ApprovalDto[] = [];
    this.checkedIds.forEach(id => disapprovals.push(new ApprovalDto(id, false)));
    this.manageIndicatorsService.processApprovals(disapprovals).subscribe( res => {
      this.search(true, true);
    });
  }

  /**
   * Triggered when clicked on expand icon
   * Updates set of which indicators are expanded
   * @param id Indicator id
   * @param checked Checked status
   */
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.similarExpandSet.add(id);
    } else {
      this.similarExpandSet.delete(id);
    }
  }

  /**
   * Triggered when threshold slider is changed
   * Retrieves similar indicators and disables slider
   * @param event Number on the threshold slider
   */
  thresholdUpdated(event: number): void{
    this.thresholdDisabled = true;
    this.threshold = event;
    this.getSimilarIndicators();
  }

  /**
   * Retrieves indicators not checked for similarity and enables slider
   */
  getSimilarIndicators(): void{
    this.isLoadingSimilar = true;
    this.machineLearningService.getSimilarIndicators(this.threshold).subscribe((x: SimilarityResponse[])=>{
      this.similarIndicators = x;
      this.thresholdDisabled = false;
      this.isLoadingSimilar = false;
    });
  }

  /**
   * Triggered when clicked on check cell
   * Updates indicator similarity check property status, updates the table and displays message
   * @param id Indicator id
   */
  checkSimilarity(id: number):void {
    this.manageIndicatorsService.similarityCheckIndicator(id).subscribe(()=> {
      this.similarExpandSet.delete(id);
      this.similarIndicators = this.similarIndicators.filter((x)=>{return x.indicator.id!=id;});
      this.messageService.success('Indicator was checked for similarity');
    });
  }

  /**
   * Triggered when clicked on X cell
   * Removes indicator, updates table and displays message
   * @param id Indicator id
   * @param similarIndicatorId Similar Indicator id
   */
  deleteIndicator(id: number, similarIndicatorId?: number): void{
    let deleteId: number = similarIndicatorId ? similarIndicatorId : id;    
    this.manageIndicatorsService.deleteIndicator(deleteId).subscribe(()=> {
      if(similarIndicatorId) {
        let similarityResponse: SimilarityResponse = this.similarIndicators.find((x)=>{return x.indicator.id == id;});
        similarityResponse.similarIndicators = similarityResponse.similarIndicators.filter((x)=>{return x.id!=similarIndicatorId;});
        this.similarExpandSet.delete(similarIndicatorId);
        this.similarIndicators = this.similarIndicators.filter((x)=>{return x.indicator.id!=similarIndicatorId;});
      } else {
        this.similarIndicators = this.similarIndicators.filter((x)=>{return x.indicator.id!=id;});
        this.similarExpandSet.delete(id);
      }
      this.messageService.success('Indicator was deleted');
    });
  }
}
