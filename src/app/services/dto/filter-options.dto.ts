class FilterOptionsDto {
  public themes: String[];
  public descriptions: String[];
  public sources: String[];
  public levels: Level[];
  public sdgCodes: String[];
}

class Level {
  public id: Number;
  public name: String;
  public description: String;
  public templateVar: String;
  public color: String;
}
