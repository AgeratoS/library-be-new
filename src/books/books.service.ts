import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresService } from 'src/genres/genres.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) { }

  async create(createBookDto: CreateBookDto) {
    const book = createBookDto;
    try {
      await this.bookRepository.save(book);
      return true;
    } catch (e) {
      return false;
    }
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      const book = await this.bookRepository.findOneBy({ id });
      book.author = updateBookDto.author;
      book.genres = updateBookDto.genres;
      book.isbn = updateBookDto.isbn;
      book.publisher = updateBookDto.publisher;
      book.shortAnnotation = updateBookDto.shortAnnotation;
      book.title = updateBookDto.title;
      book.year = updateBookDto.year;
      await this.bookRepository.save(book);
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const book = await this.bookRepository.findOneBy({ id });
      await this.bookRepository.remove(book);
      return true;
    } catch (e) {
      return false;
    }
  }
}
