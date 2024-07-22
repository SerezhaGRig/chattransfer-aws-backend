/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
  [key: string]: any;
}

/**
 * Represents some Type of the Object.
 */
export declare type ObjectType<T> = {
  new (): T;
};

/**
 * a generic result wrapper to avoid returning null or undefined
 */
export type Result = { _tag: string };

export interface ResultFail extends Result {
  _tag: "fail";
  result: string;
}

export interface ResultSuccess<T> extends Result {
  _tag: "success";
  result: T;
}
