export class IResponse<T> {
  constructor(parameters) {}
  code: number;
  message: string;
  result: T;
}
