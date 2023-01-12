import { Module } from '@nestjs/common';
import { ReadersService } from './readers.service';
import { ReadersController } from './readers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reader } from './entities/reader.entity';
import { BooksModule } from 'src/books/books.module';
import { ProfileModule } from 'src/profile/profile.module';


@Module({
  imports: [TypeOrmModule.forFeature([Reader]), BooksModule, ProfileModule],
  controllers: [ReadersController],
  providers: [ReadersService]
})
export class ReadersModule {}
