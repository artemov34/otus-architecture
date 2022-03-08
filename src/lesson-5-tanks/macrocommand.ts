import { UObject } from './uobject';
import { CheckFuelCommand, FuelAdapter, BurnFuelCommand } from "./check-fuel";
import { Command, IComandList } from "./core/command";
import { ExceptionCommand } from "./core/exception";
import { MoveCommand, MovableAdapter, ChangeVelocityCommand, ChangeVelocityAdapter } from "./movable";
import { RotateCommand, RotableAdapter } from './rotable';


export class MacroCommand implements Command {
  constructor(private cmds: IComandList[]) {}
  execute(): void {
    for (let i = 0; i < this.cmds.length; i++) {
      const { command } = this.cmds[i];
      console.log(command.constructor.name);
      try {
        command.execute();
      } catch (e) {
        const exception = new ExceptionCommand(e);
        exception.execute();
      }
    }
  }
}

export class MoveMacroCommand implements Command {
  macroCommand: MacroCommand;
  constructor(public object: UObject){
    const cmds = [
      {
        command: new CheckFuelCommand(new FuelAdapter(this.object))
      },
      {
        command: new MoveCommand(new MovableAdapter(this.object))
      },
      {
        command: new BurnFuelCommand(new FuelAdapter(this.object))
      }
    ];
    this.macroCommand = new MacroCommand(cmds);
  }
  execute(): void {
    this.macroCommand.execute();
  }

}

export class RotateMacroCommand implements Command {
  macroCommand: MacroCommand;
  constructor(public object: UObject){
    const cmds = [
      {
        command: new RotateCommand(new RotableAdapter(this.object))
      },
      {
        command: new ChangeVelocityCommand(new ChangeVelocityAdapter(this.object))
      },
    ];
    this.macroCommand = new MacroCommand(cmds);
  }
  execute(): void {
    this.macroCommand.execute();
  }

}
