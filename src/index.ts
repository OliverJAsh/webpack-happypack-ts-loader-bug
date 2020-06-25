import { noop } from '../shared/functions';

console.log(noop());

export const add = (a: number, b: number): number => a + b;
console.log(add(1, 2));
