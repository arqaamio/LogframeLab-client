import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { NzLayoutModule } from "ng-zorro-antd/layout";
@Component({
  selector: "app-pop",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
  animations: [
    trigger("dialog", [
      transition("void => *", [
        style({ transform: "scale3d(.3, .3, .3)" }),
        animate(100),
      ]),
      transition("* => void", [
        animate(100, style({ transform: "scale3d(.0, .0, .0)" })),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    var firstTime = sessionStorage.getItem("firstTime"); //Line 26-31, Pop-up only once per session
    if (!firstTime) {
      this.visible = true;
      sessionStorage.setItem("firstTime", "true"); //hide line 29 for pop-up maintenance
    } else {
      this.visible = false;
    }
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
