import { Command, IComandList } from './command';

export class RetryCommand implements Command {
  constructor(public cmd: Command) {}
  execute(): void {
    this.cmd.execute();
  }
}
