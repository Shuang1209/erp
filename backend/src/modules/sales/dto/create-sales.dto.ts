import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateSalesDto {
  @IsString()
  tenantId: string;

  @IsArray()
  deviceIds: string[];

  @IsNumber()
  totalPrice: number;
}
