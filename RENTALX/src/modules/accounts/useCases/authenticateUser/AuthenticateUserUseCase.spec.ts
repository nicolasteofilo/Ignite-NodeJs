import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserTDO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepossiotryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able a authnticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      driver_license: '123456789',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });
  it('should not be able to authenticate a user not exists', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'test@email.com',
        password: '123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      driver_license: '123456789',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'johndoe@email.com',
        password: '123',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
