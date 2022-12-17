import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Reader } from './entities/reader.entity';

@Injectable()
export class ReadersService {

  constructor(
    @InjectRepository(Reader)
    private readerRepository: Repository<Reader>,
    // @Inject(ProfileService)
    // private profileService: ProfileService
  ) {}

  create(createReaderDto: CreateReaderDto) {
    return this.readerRepository.create(createReaderDto);
  }

  findAll() {
    return this.readerRepository.find();
  }

  // TODO: Добить привязку профиля
  linkToProfile() {
      
  }

  async getBooks(id: number): Promise<Book[]> {
    const reader = await this.readerRepository.findOneBy({ id });

    if (!reader) {
      throw new HttpException('Нет читателя в запросе', HttpStatus.BAD_REQUEST);
    }
    
    return reader.books;
  }

  findOne(id: number) {
    return this.readerRepository.findOneBy({ id });
  }

  async update(id: number, updateReaderDto: UpdateReaderDto) {
    const reader = await this.readerRepository.findOneBy({ id });
    reader.firstName = updateReaderDto.firstName;
    reader.lastName = updateReaderDto.lastName;
    reader.middleName = updateReaderDto.middleName;
    reader.age = updateReaderDto.age;
    reader.gender = updateReaderDto.gender;
    return this.readerRepository.save(reader);
  }

  remove(id: number) {
    return `This action removes a #${id} reader`;
  }
}
