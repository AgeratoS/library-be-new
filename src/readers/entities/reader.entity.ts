import { Book } from "src/books/entities/book.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
    'м', 'ж'
}

@Entity()
export class Reader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    middleName: string;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column()
    age: number;

    @ManyToMany(() => Book, (book) => book.id, {
        eager: true
    })
    @JoinTable({ name: 'book_reader' })
    books: Book[];

    @ManyToOne(() => Profile, (profile) => profile.readers)
    profile: Profile;
}
