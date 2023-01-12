import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadersService } from './readers.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Controller('readers')
export class ReadersController {
  constructor(private readonly readersService: ReadersService) {}

  @Post()
  create(@Body() createReaderDto: CreateReaderDto) {
    return this.readersService.create(createReaderDto);
  }

  @Get()
  findAll() {
    return this.readersService.findAll();
  }

  @Get(':id/books')
  getBooks(@Param('id') id: string) {
    return this.readersService.getBooks(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readersService.findOne(+id);
  }

  @Post(':readerId/book/:bookId/rent')
  linkBook(@Param('readerId') readerId: string, @Param('bookId') bookId: string) {
    return this.readersService.linkBook(+readerId, +bookId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReaderDto: UpdateReaderDto) {
    return this.readersService.update(+id, updateReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readersService.remove(+id);
  }

  @Delete(':readerId/book/:bookId/unlink')
  removeBook(@Param('readerId') readerId: string, @Param('bookId') bookId: string) {
    return this.readersService.removeBook(+readerId, +bookId);
  }
}
