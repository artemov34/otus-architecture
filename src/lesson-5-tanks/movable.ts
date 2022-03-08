import { Command } from './core/command';
import { UObject } from './uobject';

export interface IVelocity {
  velocity: number[];

}
export interface IMovable extends IVelocity {
  position: number[];
}
export class MovableAdapter implements IMovable {
  constructor(public ubject: UObject) {}

  get position() {
    return this.ubject.position
  }

  set position(v: number[]) {
    this.ubject.position = v;
  }

  get velocity() {
    return this.ubject.velocity
  }
}

export class ChangeVelocityAdapter implements IVelocity {
  constructor(public ubject: UObject) {}

  get velocity() {
    return this.ubject.velocity
  }

  set velocity(v: number[]) {
    this.ubject.velocity = v;
  }
}

export class MoveCommand implements Command
{
	constructor(public movable: IMovable) {}

	public execute(): void
	{
    if(!this.movable?.position ||  this.movable?.position.length < 2) {
      throw new Error('can not read position');
    }

    if(!this.movable?.velocity ||  this.movable?.velocity.length < 2) {
      throw new Error('can not read velocity');
    }
		this.movable.position = this.movable.position.map((n,i) => this.movable.velocity[i] + n);
	}
}

export class ChangeVelocityCommand implements Command {
  constructor(public velocity: ChangeVelocityAdapter) {}
  execute(): void {
		this.velocity.velocity = this.velocity.velocity.map((n,i) => this.velocity.velocity[i] + 1);
  }
}
