

import { SquareRoot } from "./math";

describe('test math class', () => {
  let squareRoot: SquareRoot
  beforeEach(() => {
    squareRoot = new SquareRoot();
  });

  it('x^2+1=0', () => {
    expect(squareRoot.solve(1,0,1).length).toBe(0)
  })

  it('x^2+1=0', () => {
    const [x,xTwo] = squareRoot.solve(1,0,-1);
    expect(x).toBe(1)
    expect(xTwo).toBe(-1)
  })

  it('x^2+2x+1=0', () => {
    const [x,xTwo] = squareRoot.solve(1,2,1);
    expect(x).toBe(-1)
    expect(xTwo).toBe(-1)
  })

  it('throw error if a is 0', () => {
    expect(() => squareRoot.solve(1e-7,1,1)).toThrow()
  })

  it('arguments must be only number', () => {
    const error = "some arguments is not number";
    expect(() => squareRoot.solve(1,"1","1")).toThrow(error);
    expect(() => squareRoot.solve("1",1,"1")).toThrow(error);
    expect(() => squareRoot.solve("1","1",1)).toThrow(error);

  })

})
