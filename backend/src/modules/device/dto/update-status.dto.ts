import { IsEnum } from 'class-validator';
import { DeviceStatus } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(DeviceStatus)
  status: DeviceStatus;
}
