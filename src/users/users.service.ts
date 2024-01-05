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

  async createAccount({ email, password, role }: CreateAccountInput) {
    try {
      const exists = await this.usersRepository.findOneBy({ email });
      if (exists) {
        // make error
        return;
      }
      await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );
      return true;
    } catch (e) {
      // make error
      return;
    }
  }
}
