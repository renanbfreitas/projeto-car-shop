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

  public async findAll() {
    const allCars = await this._model.findAll();
    const result = allCars.map((e) => this.createCarDomain(e));
    return result;
  }

  public async findById(id: string) {
    const car = await this._model.findById(id);
    if (car === undefined) return undefined;
    const result = car.map((e) => this.createCarDomain(e));
    return result;
  }

  public async update(id: string, car: ICar) {
    const carUpdate = await this._model.update(id, car);
    return this.createCarDomain(carUpdate);
  }
}
