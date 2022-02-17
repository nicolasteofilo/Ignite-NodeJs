import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserTDO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAreadyExists = await this.usersRepository.findByEmail(email);

    if (userAreadyExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
