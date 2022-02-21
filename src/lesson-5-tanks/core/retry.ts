import { Command } from './command';

export class RetryCommand implements Command {
  name!: string;
  retryCount: number = 0;
  constructor(public cmd: Command) {
    this.name = this.cmd.constructor.name;
  }
  execute(): void {
    this.retryCount += 1;
    this.cmd.execute();
  }
}
