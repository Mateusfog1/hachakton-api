export class ApplicationError {
  constructor(public status: number, public message: string, public stack?: string) {}
}
