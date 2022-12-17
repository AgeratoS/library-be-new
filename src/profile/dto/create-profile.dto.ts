export class CreateProfileDto {
    email: string;
    password: string;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
