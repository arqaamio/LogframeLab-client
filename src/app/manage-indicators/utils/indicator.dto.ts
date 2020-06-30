import {Level} from '../../services/dto/filter.dto';

export class IndicatorDto {
  id: number;
  crsCode: string;
  dataSource: string;
  description: string;
  disaggregation: boolean;
  keywords: string;
  name: string;
  sdgCode: string;
  source: string;
  sourceVerification: string;
  themes: string;
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
    newInstance.themes = indicator.themes;
    newInstance.level = indicator.level;
    newInstance.levelId = indicator.level.id;
    newInstance.keywordsList = indicator.keywordsList;

    return newInstance;
  }
}
