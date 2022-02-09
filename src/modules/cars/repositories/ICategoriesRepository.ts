/**
 * Criamos essa interface para que possamos passá-la ao nosso service sem
 * a necessidade de passar a classe concreta do repository. Respeitando assim,
 * o princípio de substituição de Liskov, que atesta que as partes intercambiáveis
 * de um projeto devem assinar um contrato de tal forma que possam ser  trocadas umas
 * pelas outras sem que isso prejudique o funionamento do software
 */
import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string,
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO };
