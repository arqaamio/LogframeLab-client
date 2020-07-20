export class Sort {
  property: string;
  direction: string;

  constructor(event: { key: string; value: string }) {
    this.property = event.key;
    this.direction = event.value;
  }
}
