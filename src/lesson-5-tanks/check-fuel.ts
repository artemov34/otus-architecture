import { Command } from "./core/command";
import { UObject } from "./uobject"

interface IFuel
{
  fuel: number;
}

export class FuelAdapter implements IFuel
{
	constructor(public ubject: UObject ) {}

  get fuel() {
    return this.ubject.fuel;
  }

  set fuel(v: number) {
    this.ubject.fuel = v;
  }
}

export class BurnFuelCommand implements Command
{
	constructor(public burnable: IFuel) {}

	public execute(): void
	{
    if(this.burnable?.fuel === undefined) {
      throw new Error('canot read fuel');
    }

    this.burnable.fuel -= 1;
	}
}

export class CheckFuelCommand implements Command
{
	constructor(public burnable: IFuel) {}

	public execute(): void
	{
    if(this.burnable.fuel <= 0 ) {
      throw new Error('not enough fuel');
    }
	}
}
