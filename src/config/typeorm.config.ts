import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    database: 'library',
    synchronize: true,
}