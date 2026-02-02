import { View, Text, Button } from '@tarojs/components';
import { adapter } from '@erp/platform-adapter';

export default function Inspection() {
  const handleUpload = async () => {
    const url = await adapter.uploadFile('local.jpg');
    console.log('upload url', url);
  };

  return (
    <View>
      <Text>质检页 - 检查项与拍照</Text>
      <Button onClick={handleUpload}>上传图片</Button>
    </View>
  );
}
