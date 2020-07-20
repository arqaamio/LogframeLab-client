import {Component, OnInit} from '@angular/core';
import {IndicatorDto} from '../utils/indicator.dto';
import {IndicatorsManagement} from '../utils/indicators-management';
import {ManageIndicatorsService} from '../../services/indicators-management/manage-indicators.service';
import {IndicatorService} from '../../services/indicator.service';
import {ApprovalDto} from '../utils/approval.dto';

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

  constructor(public manageIndicatorsService: ManageIndicatorsService, public indicatorService: IndicatorService) {
    super(manageIndicatorsService, indicatorService);
  }

  ngOnInit(): void {
    this.search(false, true);
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
    this.allChecked = this.checkedIds.size > 0 && this.indicatorList.every(({id}) => this.checkedIds.has(
      id));
    this.someChecked = this.indicatorList.some(({id}) => this.checkedIds.has(id)) && !this.allChecked;
  }

  search(reset: boolean, forApproval: boolean) {
    super.search(reset, forApproval);
    this.updateAllChecked(false);
  }

  fetchByFilters() {
    this.search(true, true);
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

}
