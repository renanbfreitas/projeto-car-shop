import { NextFunction, Request, Response } from 'express';
import MotorcycleServices from '../Services/MotorcycleServices';

export default class MotorcycleController {
  constructor(private _service = new MotorcycleServices()) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMotorcycle = await this._service.create(req.body);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allMotorcycles = await this._service.findAll();
      return res.status(200).json(allMotorcycles);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const motoExist = await this._service.findById(id);

      if (!motoExist) return res.status(422).json({ message: 'Invalid mongo id' });
      if (motoExist.length === 0) return res.status(404).json({ message: 'Motorcycle not found' });

      return res.status(200).json(motoExist[0]);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const moto = req.body;

      const motoExist = await this._service.findById(id);

      if (!motoExist) return res.status(422).json({ message: 'Invalid mongo id' });
      if (motoExist.length === 0) return res.status(404).json({ message: 'Motorcycle not found' });

      const motoUpdated = await this._service.update(id, moto);
      return res.status(200).json(motoUpdated);
    } catch (error) {
      next(error);
    }
  }
}