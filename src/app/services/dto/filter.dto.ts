export class FilterDto {
  public themes: string[] = [];
  public source: string[] = [];
  public level: Level[] = [];
  public sdgCode: string[] = [];
  public crsCode: string[] = [];
}


export class Level {
  public id: number;
  public name: string;
  public description: string;
  public templateVar: string;
  public color: string;
}
