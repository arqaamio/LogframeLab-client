import { SeverityLevel } from './severitylevel.enum';

export class ClientError extends Error {
    sendMessage: boolean = true;
    level: SeverityLevel = SeverityLevel.ERROR;
    message: string;
    object: any;
    timestamp: Date = new Date();
}