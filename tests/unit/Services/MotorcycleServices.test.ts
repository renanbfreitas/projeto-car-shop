import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleServices';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Teste do Motorcycle na camada Service', function () {
  it('Verifica se é possível cadastrar uma moto com sucesso', async function () {
    const motorCreateInput: IMotorcycle = {

      model: 'Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,

    };
    const motorCreateOutput: Motorcycle = new Motorcycle(
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );

    sinon.stub(Model, 'create').resolves(motorCreateOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorCreateInput);

    expect(result).to.be.deep.equal(motorCreateOutput);
  });

  it('Verifica se é possível listar todas as motos', async function () {
    const motorInput: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];

    const motorInputAll: Motorcycle[] = motorInput.map((motor) => new Motorcycle(motor));

    sinon.stub(Model, 'find').resolves(motorInputAll);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(motorInputAll);
  });

  it('Verifica se é possível retornar uma moto pelo id com SUCESSO', async function () {
    const findMotorcyclesOutput: IMotorcycle[] = [
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      }];

    const expectedReturn: Motorcycle[] = findMotorcyclesOutput.map((e) => new Motorcycle(e));

    sinon.stub(Model, 'find').resolves(findMotorcyclesOutput);

    const service = new MotorcycleService();
    const result = await service.findById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(expectedReturn);

    sinon.restore();
  });

  it(
    'Verifica que não é possível listar com sucesso uma moto com id inexistente', 
    async function () {
      const invalidId = '634852326b35b59438fbeaXX';

      sinon.stub(Model, 'findById').resolves({});

      try {
        const service = new MotorcycleService();
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
