import { inject, injectable } from 'tsyringe';

import { ICaterogiesRepository } from '@modules/cars/repositories/ICaterogiesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICaterogiesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
