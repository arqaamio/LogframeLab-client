import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
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
    // Pop-up only once per session
    let shownDialog: string = sessionStorage.getItem("shownDialog"); 
    if (shownDialog) {
      this.visible = false;//change to true for pop-up mx
    } else {
      this.visible = true;
      sessionStorage.setItem("shownDialog", "true");
    }
  }

  /**
   * Emits event to close the dialog
   */
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
