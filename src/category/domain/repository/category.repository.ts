import { SearchableRepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entitites/category";

export default interface CategoryRepository
  extends SearchableRepositoryInterface<Category, any, any> {}
