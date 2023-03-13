export const add = (a: number, b: number) => a + b;

export const concat = <T>(a: T[], b: T[]) => a.concat(b);

export const assign = <T>(a: object, b: object) => Object.assign(a, b);
