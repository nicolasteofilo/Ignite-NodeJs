import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoryUseCase } from './ListCategoriesUseCase';

const categoriesRepository = null;
const ListCateregoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoriesController(
  ListCateregoryUseCase
);

export { listCategoryController };
