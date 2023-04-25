import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarServices {
  constructor(private _model = new CarODM()) {}

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(newCar: ICar) {
    const newCarCreate = await this._model.create(newCar);
    return this.createCarDomain(newCarCreate);
  } 
}
