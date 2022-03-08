export class LoggerCommand {
  constructor(public error: any) {}
  execute() {
      console.log(this.error.name + ': ' + this.error.message);
  }
  ;
}

