import { IndicatorDto } from '../manage-indicators/utils/indicator.dto';

export class SimilarityResponse {
    indicator: IndicatorDto;
    similarIndicators: IndicatorDto[];
}