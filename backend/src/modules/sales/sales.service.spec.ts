import { SalesService } from './sales.service';
import { DeviceStatus } from '@prisma/client';

describe('SalesService', () => {
  it('blocks selling when device not LISTED', async () => {
    const prisma = {
      device: {
        findMany: jest.fn().mockResolvedValue([{ id: '1', status: DeviceStatus.IN_STOCK }]),
        updateMany: jest.fn(),
      },
      salesOrder: {
        create: jest.fn(),
      },
    } as any;

    const service = new SalesService(prisma);

    await expect(
      service.create({ tenantId: 't1', deviceIds: ['1'], totalPrice: 100 }),
    ).rejects.toThrow('Device must be LISTED to sell');
  });
});
