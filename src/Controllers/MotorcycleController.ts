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
}