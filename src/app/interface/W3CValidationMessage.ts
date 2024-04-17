export interface W3CValidationMessage {
    type: string;
    subType?: string;
    lastLine: number;
    lastColumn: number;
    firstColumn: number;
    message: string;
    extract: string;
  }