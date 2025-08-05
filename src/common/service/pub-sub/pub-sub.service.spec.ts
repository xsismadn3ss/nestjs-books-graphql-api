import { Test, TestingModule } from '@nestjs/testing';
import { PubSubService } from './pub-sub.service';

describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubSubService],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should publish and subscribe', () => {
    const data = { "messages": "test" }
    Promise.resolve(service.publish("test", data))

    // obtener el iterador
    const iterator = service.asyncIterableIterator('test');
    // obtener el siguiente valor
    const next = iterator.next();
    // verificar que el valor es el esperado
    const value = next.then((res) => {
      expect(res.value).toEqual(data);
    })
    // verificar que el iterador está terminado
    const done = next.then((res) => {
      expect(res.done).toBe(true);
    })
    // validar resultados
    expect(value).resolves.toEqual(data)
    expect(done).resolves.toBe(true)
  })
});
