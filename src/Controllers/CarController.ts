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

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allCars = await this._service.findAll();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const carExist = await this._service.findById(id);

      if (!carExist) return res.status(422).json({ message: 'Invalid mongo id' });
      if (carExist.length === 0) return res.status(404).json({ message: 'Car not found' });

      return res.status(200).json(carExist[0]);
    } catch (error) {
      next(error);
    }
  }
}
