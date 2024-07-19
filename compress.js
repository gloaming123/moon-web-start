import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// 源文件夹和目标文件夹路径
const sourceFolder = 'd:/moon-web-start/public/img'
const targetFolder = 'd:/moon-web-start/output'

// 检查目标文件夹是否存在，如果不存在则创建
if (!fs.existsSync (targetFolder))
  fs.mkdirSync()

// 遍历源文件夹中的所有图片文件
fs.readdirSync (sourceFolder).forEach((file) => {
  const filePath = path.join (sourceFolder, file)
  const extname = path.extname (file)

  // 只处理JPG和PNG格式的图片
  if (extname === '.jpeg' || extname === '.jpg' || extname === '.png') {
    // 构建输出文件路径
    const outputPath = path.join (targetFolder, file)

    // 使用Sharp进行图片压缩
    if (extname === '.jpeg') {
      sharp(filePath)
      // .resize(800) // 调整图片大小为800x800像素
        .jpeg({ quality: 75 })
        .toFile(outputPath, (err) => {
          if (err)
            throw err
          // console.log (`Compressed ${file} and saved to ${outputPath}`);
        })
    }
    else if (extname === '.jpg') {
      sharp(filePath)
      // .resize(800) // 调整图片大小为800x800像素
        .jpg({ quality: 75 })
        .toFile(outputPath, (err) => {
          if (err)
            throw err
          // console.log (`Compressed ${file} and saved to ${outputPath}`);
        })
    }
    else {
      sharp(filePath)
      // .resize(800) // 调整图片大小为800x800像素
        .png({ quality: 75 })
        .toFile(outputPath, (err) => {
          if (err)
            throw err
          // console.log (`Compressed ${file} and saved to ${outputPath}`);
        })
    }
  }
})
