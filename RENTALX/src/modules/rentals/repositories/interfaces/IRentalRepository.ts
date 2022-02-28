import { ICreateRentalTDO } from '@modules/rentals/dtos/ICreateRentalTDO';

import { Rental } from '../../infra/typeorm/entities/Rental';

interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalTDO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalRepository };
