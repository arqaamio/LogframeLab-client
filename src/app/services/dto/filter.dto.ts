export class FilterDto {
  public themes: String[] = [];
  public descriptions: String[] = [];
  public source: String[] = [];
  public level: Level[] = [];
  public sdg_code: String[] = [];
  public crs_code: String[] = [];
}


class Level {
  public id: Number;
  public name: String;
  public description: String;
  public templateVar: String;
  public color: String;
}
