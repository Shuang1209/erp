import { DeviceService } from './device.service';
import { DeviceStatus } from '@prisma/client';

describe('DeviceService', () => {
  it('creates device with ACQUIRED status', async () => {
    const prisma = {
      device: {
        create: jest.fn().mockResolvedValue({ id: '1', status: DeviceStatus.ACQUIRED }),
      },
    } as any;

    const service = new DeviceService(prisma);
    const result = await service.create({
      tenantId: 't1',
      skuId: 's1',
      storeId: 'st1',
      warehouseId: 'w1',
      imei: 'imei',
    });

    expect(prisma.device.create).toHaveBeenCalled();
    expect(result.status).toBe(DeviceStatus.ACQUIRED);
  });
});
