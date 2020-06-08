import {Level} from "../../services/dto/filter.dto";

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
  keywordsList: string[]
}
