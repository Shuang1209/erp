import { View, Text, Button } from '@tarojs/components';
import { adapter } from '@erp/platform-adapter';

export default function Purchase() {
  const handleScan = async () => {
    const result = await adapter.scanCode();
    console.log('scan result', result);
  };

  return (
    <View>
      <Text>采购录入 - 扫码录入 IMEI</Text>
      <Button onClick={handleScan}>扫码</Button>
    </View>
  );
}
