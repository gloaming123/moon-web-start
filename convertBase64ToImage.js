/* eslint-disable */
import fs from 'node:fs'
import path from 'node:path'

// 函数：将base64字符串转换为图片并保存到本地
export default function(base64String, index) {
  // 检查base64字符串是否包含数据URI方案
  let matches = base64String.match(/^data:(.*?);base64,(.+)$/);

  if (!matches) {
    throw new Error('无效的base64字符串');
  }

  // 提取MIME类型和base64编码的数据
  const mime = matches[1];
  const base64Data = matches[2];

  // 解码base64数据为Buffer
  const buffer = Buffer.from(base64Data, 'base64');

  // 根据MIME类型确定文件扩展名
  let extension;
  switch (mime) {
    case 'image/jpeg':
      extension = 'jpg';
      break;
    case 'image/png':
      extension = 'png';
      break;
    case 'image/gif':
      extension = 'gif';
      break;
    case 'image/svg+xml':
      extension = 'svg';
      break;
    default:
      throw new Error('不支持的图片类型');
  }

  console.log('当前工作目录:', process.cwd());

  // 构建文件名和路径
  const outputDir = './public/imgNew'
  const filename = `image_${index}.${extension}`;
  const filePath = path.join(outputDir, filename);

  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 将Buffer写入文件
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('保存图片失败:', err);
    } else {
      console.log(`图片已保存为：${filePath}`);
    }
  });
}