import { Command } from "./core/command";
import { UObject } from "./uobject"

interface IRotable
{
  direction: number;
	readonly angularVelocity: number;
	readonly maxDirections: number;
}

export class RotableAdapter implements IRotable
{
	constructor(public ubject: UObject ) {}

  get direction() {
    return this.ubject.direction;
  }

  set direction(v: number) {
    this.ubject.direction = v;
  }

  get angularVelocity() {
    return this.ubject.angularVelocity;
  }

  get maxDirections() {
    return this.ubject.maxDirections;
  }
}

export class RotateCommand implements Command
{
	constructor(public rotable: IRotable) {}

	public execute(): void
	{
    if(!this.rotable?.direction) {
      throw new Error('can not rotate, not have default parametrs');
    }
		this.rotable.direction = (this.rotable.direction + this.rotable.angularVelocity) % this.rotable.maxDirections;
	}
}
