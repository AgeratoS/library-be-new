import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { FormsModule } from './forms/forms.module';
import { RolesModule } from './roles/roles.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BooksModule, ReadersModule, ProfileModule, FormsModule, RolesModule, GenresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
