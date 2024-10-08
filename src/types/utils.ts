export declare type Awaited<T> = T extends Promise<infer U> ? U : T;

export declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export declare type RequiredPartial<T> = {
  [P in keyof T]-?: T[P];
};

export type TransformParams<C> = {
  obj: C;
  value: string;
};
