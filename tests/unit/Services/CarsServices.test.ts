import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarServices from '../../../src/Services/CarServices';
import Car from '../../../src/Domains/Car';

describe('Teste do Car na camada Service', function () {
  it('Verifica se é possível cadastrar um carro com sucesso', async function () {
    const carCreateInput: ICar = {
      model: 'Tempra',
      year: 1995,
      color: 'Black',
      buyValue: 39.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    const carCreateOutput: Car = new Car(
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    );

    sinon.stub(Model, 'create').resolves(carCreateOutput);

    const service = new CarServices();
    const result = await service.create(carCreateInput);

    expect(result).to.be.deep.equal(carCreateOutput);
  });

  it('Verifica se é possível listar todos os carros', async function () {
    const carInput: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    const carInputAll: Car[] = carInput.map((car) => new Car(car));

    sinon.stub(Model, 'find').resolves(carInputAll);

    const service = new CarServices();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(carInputAll);
  });

  it('Verifica se é possível retornar um carro pelo id com SUCESSO', async function () {
    const findCarsOutput: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      }];

    const expectedReturn: Car[] = findCarsOutput.map((e) => new Car(e));

    sinon.stub(Model, 'find').resolves(findCarsOutput);

    const service = new CarServices();
    const result = await service.findById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(expectedReturn);

    sinon.restore();
  });

  it(
    'Verifica que não é possível listar com sucesso um carro com id inexistente', 
    async function () {
      const invalidId = '634852326b35b59438fbeaXX';

      sinon.stub(Model, 'findById').resolves({});

      try {
        const service = new CarServices();
        await service.findById(invalidId);
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
      }
    },
  );

  afterEach(function () {
    sinon.restore();
  });
});
