import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { DeviceStatus, SalesStatus } from '@prisma/client';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSalesDto) {
    const devices = await this.prisma.device.findMany({
      where: { id: { in: dto.deviceIds } },
    });

    if (devices.length !== dto.deviceIds.length) {
      throw new BadRequestException('Some devices not found');
    }

    const invalid = devices.find((device) => device.status !== DeviceStatus.LISTED);
    if (invalid) {
      throw new BadRequestException('Device must be LISTED to sell');
    }

    const order = await this.prisma.salesOrder.create({
      data: {
        tenantId: dto.tenantId,
        code: `SO-${Date.now()}`,
        status: SalesStatus.PAID,
        totalPrice: dto.totalPrice,
        items: {
          create: dto.deviceIds.map((deviceId) => ({ deviceId })),
        },
      },
    });

    await this.prisma.device.updateMany({
      where: { id: { in: dto.deviceIds } },
      data: { status: DeviceStatus.SOLD },
    });

    return order;
  }
}
