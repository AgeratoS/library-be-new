import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'when_return' })
    whenReturn: Date;
    
    @Column({ name: 'when_taken' })
    whenTaken: Date;

    @Column({ name: 'is_returned' })
    isReturned: boolean;
}
