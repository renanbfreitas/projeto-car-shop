import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleServices {
  constructor(private _model = new MotorcycleODM()) {}

  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(newMotorcycle: IMotorcycle) {
    const newMotorcycleCreate = await this._model.create(newMotorcycle);
    return this.createMotorcycleDomain(newMotorcycleCreate);
  }
}