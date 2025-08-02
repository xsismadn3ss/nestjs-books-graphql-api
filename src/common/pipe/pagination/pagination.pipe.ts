import { Injectable, PipeTransform } from '@nestjs/common';
import { Pagination } from '../../interface/pagination/pagination.interface';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: Pagination) {
    const page = value.page ?? 1;
    const size = value.size ?? 10;

    // formatear page y size para usar en prisma
    const skip = (page - 1) * size;
    return { page: skip, size } as Pagination;
  }
}
