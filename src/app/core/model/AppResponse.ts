export class AppResponse<T> {
  constructor(parameters) {}
  code: number;
  message: string;
  result: T;
}
