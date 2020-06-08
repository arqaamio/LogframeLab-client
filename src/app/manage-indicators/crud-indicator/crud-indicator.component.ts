import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {IndicatorDto} from "../utils/indicator.dto";
import {Level} from "../../services/dto/filter.dto";
import {IndicatorService} from "../../services/indicator.service";
import {AddNewIndicatorService} from "./service/add-new-indicator.service";

@Component({
  selector: 'app-crud-indicator',
  templateUrl: './crud-indicator.component.html',
  styleUrls: ['./crud-indicator.component.scss']
})
export class CrudIndicatorComponent implements OnInit, OnChanges {

  indicator = new IndicatorDto();

  @Input("indicator")
  indicatorForOperation;

  levels: Level[];

  @Input("displayCrudModal")
  displayCrudModal = false;

  @Output("hideCrudModal")
  hideCrudModal = new EventEmitter<boolean>();

  @Output("indicatorAdded")
  indicatorAdded = new EventEmitter();

  @Output("indicatorUpdated")
  indicatorUpdated = new EventEmitter();

  @Output("indicatorDeleted")
  indicatorDeleted = new EventEmitter();

  @Input("operation")
  operation: Operation;

  constructor(private indicatorService: IndicatorService,
              private newIndicatorService: AddNewIndicatorService) {
  }

  ngOnInit(): void {
    this.indicatorService.getFilters().subscribe(filters => {
      this.levels = filters.level;
    })
  }

  createIndicator() {
    this.newIndicatorService.createIndicator(this.indicator).subscribe(res => {
      if (res.ok) {
        this.cancel();
        this.indicatorAdded.emit(true);
      }
    })
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
    })
  }

  reset() {
    this.indicator = new IndicatorDto();
    this.operation = null;
  }

  cancel() {
    this.reset();
    this.displayCrudModal = false;
    this.hideCrudModal.emit(true);
  }

  isEditing(): boolean {
    return this.operation === Operation.UPDATE;
  }

  isNew(): boolean {
    return this.operation === Operation.CREATE;
  }

  isDeleting(): boolean {
    return this.operation == Operation.DELETE;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditing() || this.isDeleting()) {
      this.indicator = this.indicatorForOperation;
      this.indicator.levelId = this.indicatorForOperation.level.id;
    }
  }
}

export enum Operation {
  CREATE,
  READ,
  UPDATE,
  DELETE
}
