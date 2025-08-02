import { IsNumber, Max, Min } from 'class-validator';

export class Pagination {
  @IsNumber()
  @Min(1)
  page: number;
  @IsNumber()
  @Min(1)
  @Max(100, { message: 'The maximum size is 100' })
  size: number;
}
