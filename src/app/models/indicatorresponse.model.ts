import { Source } from './source.model';
import { CRSCode } from './crscode.model';
import { SDGCode } from './sdgcode.model';

export class IndicatorResponse {
    id: number;
    level: string;
    color: string;
    name: string;
    description: string;
    themes: string;
    source: Array<Source>;
    disaggregation: boolean;
    crsCode: Array<CRSCode>;
    sdgCode: Array<SDGCode>;
    numTimes: number;
    keys: Array<string>;
    var: string;
}