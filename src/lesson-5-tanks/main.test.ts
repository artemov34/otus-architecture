import { RotableAdapter, RotateCommand } from './rotable';
import { MoveCommand, MovableAdapter } from './movable';
import { Command } from './core/command';
import { RetryCommand } from './core/retry';
import { ErrorHandlerCommand } from './core/error-handler';

describe('object movable', () => {
  let tank = {
    position: [12,5],
    velocity: [-7,3]
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
    expect(() => mockObject.execute()).toThrow('can not reade position')
  })

  it('must thrown error if not have velocity', () => {
    tank = {
      position: [12,5],
    }
    const mockObject: MoveCommand = new MoveCommand(new MovableAdapter(tank));
    expect(() => mockObject.execute()).toThrow('can not reade velocity')
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

    const cmds: { command: Command }[] = [
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
          const errorHandler = new ErrorHandlerCommand(e as Error);
          errorHandlerSpy = jest.spyOn(errorHandler, 'execute');
          cmds.push({ command: errorHandler });
        }
      }
    }

    expect(retrySpy).toBeCalledTimes(1);
    expect(errorHandlerSpy).toBeCalledTimes(1);
  })


});
