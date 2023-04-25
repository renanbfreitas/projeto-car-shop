import { NextFunction, Request, Response } from 'express';
import CarServices from '../Services/CarServices';

export default class CarController {
  constructor(private _service = new CarServices()) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await this._service.create(req.body);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
}
