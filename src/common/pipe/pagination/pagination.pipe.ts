import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationInput } from '../../interface/pagination/pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: PaginationInput) {
    const { page, size } = value;

    // formatear page y size para usar en prisma
    const skip = (page - 1) * size;
    return { page: skip, size } as PaginationInput;
  }
}
