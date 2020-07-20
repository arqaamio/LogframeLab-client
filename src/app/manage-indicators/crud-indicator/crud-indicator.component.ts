import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {IndicatorDto} from '../utils/indicator.dto';
import {Level} from '../../services/dto/filter.dto';
import {IndicatorService} from '../../services/indicator.service';
import {AddNewIndicatorService} from './service/add-new-indicator.service';

@Component({
  selector: 'app-crud-indicator',
  templateUrl: './crud-indicator.component.html'
})
export class CrudIndicatorComponent implements OnInit, OnChanges {

  indicator = new IndicatorDto();

  @Input()
  indicatorForOperation: IndicatorDto = undefined;

  levels: Level[] = [];

  @Input()
  displayCrudModal = false;

  @Output()
  hideCrudModal = new EventEmitter<boolean>();

  @Output()
  indicatorAdded = new EventEmitter();

  @Output()
  indicatorUpdated = new EventEmitter();

  @Output()
  indicatorDeleted = new EventEmitter();

  @Input()
  operation: Operation = undefined;

  constructor(private indicatorService: IndicatorService,
              private newIndicatorService: AddNewIndicatorService) {
  }

  ngOnInit(): void {
    this.indicatorService.getFilters().subscribe(filters => {
      this.levels = filters.level;
    });
  }

  createIndicator() {
    this.newIndicatorService.createIndicator(this.indicator).subscribe(res => {
      if (res.ok) {
        this.cancel();
        this.indicatorAdded.emit(true);
      }
    });
  }

  updateIndicator() {
    this.newIndicatorService.updateIndicator(this.indicator).subscribe(res => {
      if (res.ok) {
        this.cancel();
        this.indicatorUpdated.emit(true);
      }
    });
  }

  deleteIndicator() {
    this.newIndicatorService.deleteIndicatorById(this.indicator.id).subscribe(res => {
      if (res.ok) {
        this.cancel();
        this.indicatorDeleted.emit(true);
      }
    });
  }

  reset() {
    this.indicator = new IndicatorDto();
  }

  cancel() {
    this.hideCrudModal.emit(true);
  }

  isEditing(): boolean {
    return this.operation === Operation.UPDATE;
  }

  isNew(): boolean {
    return this.operation === Operation.CREATE;
  }

  isDeleting(): boolean {
    return this.operation === Operation.DELETE;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditing()) {
      this.indicator = IndicatorDto.clone(this.indicatorForOperation);
    } else if (this.isDeleting()) {
      this.indicator = this.indicatorForOperation;
    } else if (this.isNew()) {
      this.indicator = new IndicatorDto();
    }
  }
}

export enum Operation {
  CREATE,
  READ,
  UPDATE,
  DELETE
}
