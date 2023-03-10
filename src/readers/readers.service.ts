import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { FindProfileDto } from 'src/profile/dto/find-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { Repository } from 'typeorm';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Reader } from './entities/reader.entity';

@Injectable()
export class ReadersService {

  constructor(
    @InjectRepository(Reader)
    private readerRepository: Repository<Reader>,
    @Inject(BooksService)
    private bookService: BooksService,
    @Inject(ProfileService)
    private profileService: ProfileService
  ) { }

  create(createReaderDto: CreateReaderDto) {
    return this.readerRepository.create(createReaderDto);
  }

  findAll() {
    return this.readerRepository.find();
  }

  async linkToProfile(profile: FindProfileDto, createReaderDto: CreateReaderDto) {
    try {
      const newProfile = await this.profileService.findByCredentials(profile);
      const newReader = this.readerRepository.create(createReaderDto);

      newReader.profile = newProfile;
      await this.readerRepository.save(newReader);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async linkBook(readerId: number, bookId: number): Promise<boolean> {
    const reader = await this.readerRepository.findOneBy({ id: readerId });

    if (reader) {
      const book = await this.bookService.findOne(bookId);
      if (book) {
        reader.books = [...reader.books, book];
        await this.readerRepository.save(reader);
        return true;
      }
    }
    return false;
  }

  async getBooks(id: number): Promise<Book[]> {
    const reader = await this.readerRepository.findOneBy({ id });

    if (!reader) {
      throw new HttpException('?????? ???????????????? ?? ??????????????', HttpStatus.BAD_REQUEST);
    }

    return reader.books;
  }

  findOne(id: number) {
    return this.readerRepository.findOneBy({ id });
  }

  async removeBook(readerId: number, bookId: number) {
    const reader = await this.readerRepository.findOneBy({ id: readerId });
    if (reader) {
      console.log("before: ", reader);
      reader.books = reader.books.filter((book) => book.id !== bookId);
      console.log("after: ", reader);

      await this.readerRepository.save(reader);
      return true;
    }
    return false;
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
