import { DeepPartial } from "typeorm";
import { Gender } from "../entities/reader.entity";

export class CreateReaderDto {
    firstName: string;
    lastName: string;
    middleName?: string;
    gender: DeepPartial<Gender>;
    age: number;

    constructor(firstName, lastName, gender, age, middleName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.middleName = middleName;
    }
}
