import { Command } from './command';

export class ErrorHandlerCommand implements Command {
  constructor(public error: Error) {}
  public execute() {
    console.log(this.error.name + ': ' + this.error.message)
  };
}
