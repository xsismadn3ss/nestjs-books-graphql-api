import { CreateAuthorInput } from './dto/create-author.input';
import { Author } from './entities/author.entity';
import { PaginationInput } from '../common/interface/pagination/pagination.interface';
import { UpdateAuthorInput } from './dto/update-author.input';

export interface IAuthorsService {
  create(createAuthorInput: CreateAuthorInput): Promise<Author>;
  findAll(pagination: PaginationInput, name?: string): Promise<Author[]>;
  findOne(id: number): Promise<Author>;
  update(updateAuthorInput: UpdateAuthorInput): Promise<Author>;
  remove(id: number): Promise<void>;
}
