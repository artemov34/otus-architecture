export class SquareRoot {
  solve(a: string | number,b: string | number,c: string | number, e = 1e-5) {
    if(typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
      throw new Error("some arguments is not number");
    }
    if(Math.abs(a)<e) {
      throw new Error("a не равно 0");
    }

    const d = b*b - 4*a*c;
    console.log(d, e)

    if(Math.abs(d)<e) {
      console.log("d === 0")
      return [-b/2*a, -b/2*a];
    }

    if(d < 0) {
      console.log("d < 0")
      return [];
    }



    if(d > 0) {
      console.log("d > 0")
      return [(-b+Math.sqrt(d))/(2*a), (-b-Math.sqrt(d))/(2*a)];
    }

    return [];
  }
}
