import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
  
export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Cars || model('Cars', this.schema);
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<ICar[] | undefined> {
    if (!isValidObjectId(id)) return undefined;

    return this.model.find({ _id: id });
  }
}
