import { CreateBookInput } from './dto/create-book.input';
import { Book } from './entities/book.entity';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { SearchBookInput } from './dto/search-book.input';
import { UpdateBookInput } from './dto/update-book.input';

export interface IBooksService {
  create(createBookInput: CreateBookInput): Promise<Book>;
  findAll(
    pagination: PaginationInput,
    searchBookInput?: SearchBookInput,
  ): Promise<Book[]>;
  findOne(id: number): Promise<Book>;
  update(updateBookInput: UpdateBookInput): Promise<Book>;
  remove(id: number): Promise<void>;
}
