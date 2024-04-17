import { W3CValidationMessage } from "./W3CValidationMessage";

export interface W3CValidationResult {
    url?: string;
    messages: W3CValidationMessage[];
  }