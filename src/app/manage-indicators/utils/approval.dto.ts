export class ApprovalDto {
  id: number;
  isApproved: boolean;

  constructor(id: number, isApproved: boolean) {
    this.id = id;
    this.isApproved = isApproved;
  }
}
