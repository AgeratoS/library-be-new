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
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const exists = await this.profileRepository.findBy(createProfileDto);
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

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  async remove(id: number) {
    const profile = await this.profileRepository.findOneByOrFail({ id });

    if (profile) {
      const removed = await this.profileRepository.remove([profile]);
      return removed;
    }
    return [];
  }
}
