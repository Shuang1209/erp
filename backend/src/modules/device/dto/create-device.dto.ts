import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  tenantId: string;

  @IsString()
  skuId: string;

  @IsString()
  storeId: string;

  @IsString()
  warehouseId: string;

  @IsString()
  imei: string;

  @IsOptional()
  @IsString()
  imei2?: string;

  @IsOptional()
  @IsString()
  serial?: string;

  @IsOptional()
  @IsNumber()
  currentCost?: number;
}
