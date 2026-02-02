import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceStatus } from '@prisma/client';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.device.findMany();
  }

  create(dto: CreateDeviceDto) {
    return this.prisma.device.create({
      data: {
        tenantId: dto.tenantId,
        skuId: dto.skuId,
        storeId: dto.storeId,
        warehouseId: dto.warehouseId,
        imei: dto.imei,
        imei2: dto.imei2,
        serial: dto.serial,
        status: DeviceStatus.ACQUIRED,
        currentCost: dto.currentCost ?? 0,
      },
    });
  }

  async updateStatus(id: string, status: DeviceStatus) {
    const device = await this.prisma.device.findUnique({ where: { id } });
    if (!device) {
      throw new BadRequestException('Device not found');
    }
    return this.prisma.device.update({
      where: { id },
      data: { status },
    });
  }
}
