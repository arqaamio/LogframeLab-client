export class FilterDto {
  public themes: String[] = [];
  public source: String[] = [];
  public level: Level[] = [];
  public sdgCode: String[] = [];
  public crsCode: String[] = [];
}


class Level {
  public id: Number;
  public name: String;
  public description: String;
  public templateVar: String;
  public color: String;
}
