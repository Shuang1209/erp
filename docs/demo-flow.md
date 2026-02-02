# Demo 流程演示

1. 登录管理后台或 Swagger，使用测试账号 `admin/Admin@123`。
2. 创建采购单：录入 IMEI → 状态 ACQUIRED/QC_PENDING。
3. 质检：提交检查项结果 → 设备进入 QC_PASSED。
4. 定价：填写收购价/售价 → 进入 PRICED。
5. 入库：选择仓库 → 进入 IN_STOCK，并生成库存流水。
6. 整备：创建整备工单 → REFURB_IN_PROGRESS → REFURB_DONE。
7. 二检：RECHECK_PENDING → LISTED。
8. 销售：创建销售单，设备状态转为 SOLD，生成出库流水。
9. 售后：创建售后单，退货进入 RETURNED → 可复入库或报废。
