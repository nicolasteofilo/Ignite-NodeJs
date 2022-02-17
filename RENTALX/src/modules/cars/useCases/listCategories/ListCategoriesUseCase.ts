import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/entities/Category';
import { ICaterogiesRepository } from '@modules/cars/repositories/ICaterogiesRepository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICaterogiesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoryUseCase };
