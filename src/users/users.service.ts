import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    try {
      const exists = await this.usersRepository.findOneBy({ email });
      if (exists) {
        return '해당 이메일을 가진 사용자가 이미 존재합니다.';
      }
      await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );
    } catch (e) {
      return '계정을 생성할 수 없습니다.';
    }
  }
}
