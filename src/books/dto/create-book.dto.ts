import { Genre } from "src/genres/entities/genre.entity";

export class CreateBookDto {
    title: string;
    shortAnnotation?: string;
    year: number;
    publisher: string;
    isbn?: string;
    author: string;
    genres?: Array<Genre>
}
