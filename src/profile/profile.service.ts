import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FindProfileDto } from './dto/find-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) { }

  async create(createProfileDto: CreateProfileDto) {
    const exists = await this.profileRepository.findBy({
      email: createProfileDto.email,
      password: createProfileDto.password
    });

    if (exists.length > 0) {
      throw new HttpException('Пользователь уже существует', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.profileRepository.save(createProfileDto);
  }

  findAll() {
    return this.profileRepository.find();
  }

  findOne(id: number) {
    return this.profileRepository.findOneBy({ id });
  }

  findByCredentials(findProfileDto: FindProfileDto) {
    return this.profileRepository.findOneBy(findProfileDto)
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const exists = await this.profileRepository.findOneBy({ id });

    if (exists) {
      exists.email = updateProfileDto.email;
      exists.password = updateProfileDto.password;
      exists.roles = [updateProfileDto.role];
      await this.profileRepository.save(exists);
      return true;
    }
    return false;
  }

  async remove(id: number) {
    const profile = await this.profileRepository.findOneByOrFail({ id });

    if (profile) {
      await this.profileRepository.remove([profile]);
      return true;
    }
    return false;
  }
}
