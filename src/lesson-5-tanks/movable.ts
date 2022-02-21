import { Command } from './core/command';
import { UObject } from './uobject';

export interface IMovable {
  position: number[];
  readonly velocity: number[];
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

export class MoveCommand implements Command
{
	constructor(public movable: IMovable) {}

	public execute(): void
	{
    if(!this.movable?.position ||  this.movable?.position.length < 2) {
      throw new Error('can not reade position');
    }

    if(!this.movable?.velocity ||  this.movable?.velocity.length < 2) {
      throw new Error('can not reade velocity');
    }
		this.movable.position = this.movable.position.map((n,i) => this.movable.velocity[i] + n);
	}
}
