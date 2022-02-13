export class Vector {
  constructor(public body: number[]) {}

  public static Vector(v1: Vector, v2: Vector) {
    const newBody: number[] = [v1.body.length];
		for(let i = 0; i < newBody.length; ++i)
		{
			newBody[i] = v1.body[i] + v2.body[i];
		}
		return new Vector(newBody);
  }
}
