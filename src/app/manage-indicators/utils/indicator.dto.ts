import {Level} from '../../services/dto/filter.dto';
import { CRSCode } from 'src/app/models/crscode.model';
import { Source } from 'src/app/models/source.model';
import { SDGCode } from 'src/app/models/sdgcode.model';

export class IndicatorDto {
  id: number;
  crsCode: Array<CRSCode>;
  dataSource: string;
  description: string;
  disaggregation: boolean;
  keywords: string;
  name: string;
  sdgCode: Array<SDGCode>;
  source: Array<Source>;
  sourceVerification: string;
  sector: string;
  level: Level;
  levelId: number;
  keywordsList: string[];

  static clone(indicator: IndicatorDto): IndicatorDto {
    const newInstance = new IndicatorDto();
    newInstance.id = indicator.id;
    newInstance.crsCode = indicator.crsCode;
    newInstance.dataSource = indicator.dataSource;
    newInstance.description = indicator.description;
    newInstance.disaggregation = indicator.disaggregation;
    newInstance.keywords = indicator.keywords;
    newInstance.name = indicator.name;
    newInstance.sdgCode = indicator.sdgCode;
    newInstance.source = indicator.source;
    newInstance.sourceVerification = indicator.sourceVerification;
    newInstance.sector = indicator.sector;
    newInstance.level = indicator.level;
    newInstance.levelId = indicator.level.id;
    newInstance.keywordsList = indicator.keywordsList;

    return newInstance;
  }
}
