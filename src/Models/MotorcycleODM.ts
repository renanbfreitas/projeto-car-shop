import {
  Schema,
  isValidObjectId,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';
  
export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }
  
  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find({});
  }
  
  public async findById(id: string): Promise<IMotorcycle[] | undefined> {
    if (!isValidObjectId(id)) return undefined;
  
    return this.model.find({ _id: id });
  }
}
