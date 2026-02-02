import { PrismaClient, DeviceStatus, RefurbStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: { name: 'Demo Tenant' },
  });

  const store = await prisma.store.create({
    data: { name: '主门店', tenantId: tenant.id },
  });

  const warehouse = await prisma.warehouse.create({
    data: { name: '主仓库', tenantId: tenant.id, storeId: store.id },
  });

  const permissions = await prisma.permission.createMany({
    data: [
      { code: 'purchase.create', name: '采购创建' },
      { code: 'sales.create', name: '销售开单' },
      { code: 'device.manage', name: '设备管理' },
    ],
  });

  const role = await prisma.role.create({
    data: {
      name: '管理员',
      tenantId: tenant.id,
      permissions: {
        connect: await prisma.permission.findMany(),
      },
    },
  });

  const password = await bcrypt.hash('Admin@123', 10);

  await prisma.user.create({
    data: {
      tenantId: tenant.id,
      username: 'admin',
      password,
      roleId: role.id,
      storeId: store.id,
    },
  });

  const sku = await prisma.sku.create({
    data: {
      tenantId: tenant.id,
      brand: 'Apple',
      model: 'iPhone 13',
      color: '黑色',
      storage: '128G',
      network: '5G',
    },
  });

  for (let i = 0; i < 10; i += 1) {
    const device = await prisma.device.create({
      data: {
        tenantId: tenant.id,
        skuId: sku.id,
        storeId: store.id,
        warehouseId: warehouse.id,
        imei: `IMEI${i}${Date.now()}`,
        status: i < 3 ? DeviceStatus.IN_STOCK : DeviceStatus.LISTED,
        currentCost: 2000 + i * 10,
      },
    });

    await prisma.inventoryTx.create({
      data: {
        tenantId: tenant.id,
        deviceId: device.id,
        warehouseId: warehouse.id,
        type: 'INBOUND',
      },
    });

    if (i === 0) {
      await prisma.refurbOrder.create({
        data: {
          tenantId: tenant.id,
          deviceId: device.id,
          status: RefurbStatus.IN_PROGRESS,
          content: '换电池',
          laborCost: 50,
          partsCost: 120,
        },
      });
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
