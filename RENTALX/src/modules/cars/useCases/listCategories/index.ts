import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoryUseCase } from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getIntance();
const ListCateregoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(
  ListCateregoryUseCase
);

export { listCategoryController };
