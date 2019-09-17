import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryError extends HttpException {
  message = 'Category does not exists';
  constructor() {
    super('Category does not exists', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
