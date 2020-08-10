import { CRSCode } from 'src/app/models/crscode.model';
import { SDGCode } from 'src/app/models/sdgcode.model';
import { Source } from 'src/app/models/source.model';

export class FilterDto {
  public themes: string[] = [];
  public source: Source[] = [];
  public level: Level[] = [];
  public sdgCode: SDGCode[] = [];
  public crsCode: CRSCode[] = [];
  public levelIds: number[] = [];
}


export class Level {
  public id: number;
  public name: string;
  public description: string;
  public templateVar: string;
  public color: string;
}
