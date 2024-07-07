import { StatusCode } from './constants'

export default class EnsenasError extends Error {
  private status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status

    // Ensure the error prototype chain is set correctly
    Object.setPrototypeOf(this, new.target.prototype)
  }

  getStatus(): number {
    return this.status
  }

  static fromMessage(message: string): EnsenasError {
    return new EnsenasError(message, StatusCode.ERROR)
  }

  static fromStatusAndMessage(status = StatusCode.ERROR, message: string): EnsenasError {
    return new EnsenasError(message, status)
  }
}

/**
 * TODO: REFACTOR ESTA CLASE PARA QUE THROWEEE HTTP EXCEPTION Y LISTO.
 */
