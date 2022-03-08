export interface Command
{
	execute(): void
}

export interface IComandList {
  command: Command
}
