import { Component, OnInit } from "@angular/core";
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: "app-imprint",
  templateUrl: "./imprint.component.html",
  styleUrls: ["./imprint.component.scss"],
})
export class ImprintComponent implements OnInit {
  constructor( private titleService: Title,
               private metaService: Meta) {
    this.setTitle('Imprint | Logframe Lab - The Free, Open-Source Logframe Builder');
    this.metaService.updateTag(
      {
        name: 'description',
        content: 'Using intelligent machine learning, Logframe Lab produces practical, relevant indicators taken from securely ' +
          'uploaded project proposals. Once confirmed, these indicators are turned into a useable logical framework. '
      }
    );
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {}
}
