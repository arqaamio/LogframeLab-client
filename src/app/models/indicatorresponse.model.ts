import { Source } from './source.model';
import { CRSCode } from './crscode.model';
import { SDGCode } from './sdgcode.model';

export class IndicatorResponse {
    id: number;
    level: string;
    color: string;
    name: string;
    description: string;
    sector: string;
    source: Array<Source>;
    disaggregation: boolean;
    crsCode: Array<CRSCode>;
    sdgCode: Array<SDGCode>;
    score: number;
    keys: Array<string>;
    date: string;
    value: string;
}