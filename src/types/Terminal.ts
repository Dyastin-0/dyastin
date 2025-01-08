export interface CommandHandler {
    command: string;
    description: string;
    execute: () => string[];
  }
  