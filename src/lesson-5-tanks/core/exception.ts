export class ExceptionCommand {
    constructor(public error: any) {}
    execute() {
      throw new Error(this.error)
    }
    ;
}
