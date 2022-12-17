import { Genre } from "src/genres/entities/genre.entity";
import { Reader } from "src/readers/entities/reader.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ name: 'short_annotation', type: "text" })
    shortAnnotation: string;

    @Column()
    year: number;

    @Column()
    publisher: string;

    @Column()
    isbn: string;

    @ManyToMany(() => Reader)
    @JoinTable({ name: 'book_reader' })
    takenBy: Reader[];

    @ManyToMany(() => Genre)
    genres: Genre[]
}
