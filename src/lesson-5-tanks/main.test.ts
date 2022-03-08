import { RotableAdapter, RotateCommand } from './rotable';
import { MoveCommand, MovableAdapter, ChangeVelocityCommand, ChangeVelocityAdapter } from './movable';
import { IComandList } from './core/command';
import { RetryCommand } from './core/retry';
import { ExceptionCommand } from './core/exception';
import { BurnFuelCommand, CheckFuelCommand, FuelAdapter } from './check-fuel';
import { MacroCommand, MoveMacroCommand, RotateMacroCommand } from './macrocommand';
import { LoggerCommand } from './core/logger';

describe('object movable', () => {
  let tank = {
    position: [12,5],
    velocity: [-7,3],
    fuel: 10
  } as any

  it('obejct must move to 5,8', () => {
    const mockObject: MoveCommand = new MoveCommand(new MovableAdapter(tank));
    mockObject.execute();
    expect(mockObject.movable.position.toString()).toBe('5,8');
  })

  it('must thrown error if not have position', () => {
    tank = {
      velocity: [-7,3]
    }
    const mockObject: MoveCommand = new MoveCommand(new MovableAdapter(tank));
    expect(() => mockObject.execute()).toThrow('can not read position')
  })

  it('must thrown error if not have velocity', () => {
    tank = {
      position: [12,5],
    }
    const mockObject: MoveCommand = new MoveCommand(new MovableAdapter(tank));
    expect(() => mockObject.execute()).toThrow('can not read velocity')
  })

  it('must rotate uobject', () => {
    tank = {
      direction: 5,
      angularVelocity: 3,
      maxDirections: 10
    }
    const mockObject: RotateCommand = new RotateCommand(new RotableAdapter(tank));
    mockObject.execute()
    expect(mockObject.rotable.direction).toBe(8)
  })


  it('must thrown error if not have default params', () => {
    tank = {}
    const mockObject: RotateCommand = new RotateCommand(new RotableAdapter(tank));
    expect(() => mockObject.execute()).toThrow('can not rotate, not have default parametrs')
  })

  it('repeat command and handler must run', () => {
    tank = {
      position: [12,5],
      //velocity: [-7,3]
    }
    let retrySpy;
    let errorHandlerSpy;

    const cmds: IComandList[] = [
      { command: new MoveCommand(new MovableAdapter(tank)) },
      { command: new RotateCommand(new RotableAdapter(tank)) },
    ];

    for (let i = 0; i < cmds.length; i++) {
      const { command } = cmds[i];
      try {
        command.execute();
      } catch(e) {
        if(command.constructor.name !== 'RetryCommand') {
          const retry = new RetryCommand(command);
          retrySpy = jest.spyOn(retry, 'execute');
          cmds.push({ command: retry });
        } else {
          const errorHandler = new LoggerCommand(e as Error);
          errorHandlerSpy = jest.spyOn(errorHandler, 'execute');
          cmds.push({ command: errorHandler });
        }
      }
    }

    expect(retrySpy).toBeCalledTimes(1);
    expect(errorHandlerSpy).toBeCalledTimes(1);
  })

  it('checkburnfuel command', () => {
    const tank = {
      fuel: -1
    };
    const checkCommand = new CheckFuelCommand(new FuelAdapter(tank))
    expect(() =>  checkCommand.execute()).toThrow('not enough fuel')
  })

  it('burnFuel command', () => {
    const tank = {
      fuel: 7
    };

    const burnCommand = new BurnFuelCommand(new FuelAdapter(tank))
    burnCommand.execute();
    burnCommand.execute();
    burnCommand.execute();

    expect(tank.fuel).toBe(4)
  })

  it('macro command move', () => {
    const tank = {
      position: [10, 4],
      velocity: [-7, 3],
      fuel: 10
    };

    const macroCommand = new MoveMacroCommand(tank);
    macroCommand.execute();
    macroCommand.execute();
    macroCommand.execute();

    expect(tank.fuel).toBe(7);
    expect(tank.position.toString()).toBe('-11,13');
  });

  it('macro has exception move', () => {
    const tank = {
      fuel: 10
    };

    const macroCommand = new MoveMacroCommand(tank);
    expect(() => macroCommand.execute()).toThrow('Error: can not read position')
  });

  it('change velocity', () => {
    const tank = {
      velocity: [-7, 3],
    };

    const changeVelocityCommand = new ChangeVelocityCommand(new ChangeVelocityAdapter(tank))
    changeVelocityCommand.execute()
    expect(tank.velocity.toString()).toBe('-6,4');
  })

  it('must rotate and change velocity uobject', () => {
    tank = {
      direction: 5,
      angularVelocity: 3,
      maxDirections: 10,
      velocity: [-7, 3],
    }
    const rotateCommand = new RotateMacroCommand(tank);
    rotateCommand.execute()
    expect(tank.velocity.toString()).toBe('-6,4');
    expect(tank.direction).toBe(8)
  })

});
