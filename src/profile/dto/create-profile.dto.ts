import { Role } from "src/roles/entities/role.entity";

export class CreateProfileDto {
    email: string;
    password: string;
    role: Role;

    constructor(email, password, role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
