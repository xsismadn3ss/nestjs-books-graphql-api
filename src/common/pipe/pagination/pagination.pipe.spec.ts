import { PaginationPipe } from './pagination.pipe';
import { PaginationInput } from '../../interface/pagination/pagination.interface';

describe('PaginationPipe', () => {
  it('should be defined', () => {
    expect(new PaginationPipe()).toBeDefined();
  });

  it('should format pagination', () => {
    const page = 1;
    const size = 10;

    const spectedResult: PaginationInput = {
      page: (page - 1) * size,
      size,
    };

    const paginationPipe = new PaginationPipe();
    const result = paginationPipe.transform({ page, size });
    expect(result).toEqual(spectedResult);
  });
});
