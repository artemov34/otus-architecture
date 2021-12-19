

import { SquareRoot } from "./math";

describe('test math class', () => {
  let squareRoot: SquareRoot
  beforeEach(() => {
    squareRoot = new SquareRoot();
  });

  it('solve must be summ', () => {
    expect(squareRoot.solve(1,2,3)).toBe(3)
  })

})
