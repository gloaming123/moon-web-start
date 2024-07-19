import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'

const stat = promisify(fs.stat)

const arr = []

// 定义一个函数来将图片文件转换为Base64字符串
async function convertImagesToBase64(inputDir, outputDir) {
  if (!fs.existsSync (outputDir))
    fs.mkdirSync (outputDir)

  const files = await fs.promises.readdir (inputDir)
  for (const file of files) {
    const filePath = path.join (inputDir, file)
    const stats = await stat(filePath)

    if (stats.isDirectory ()) {
      // 如果是目录，则递归调用convertImagesToBase64函数
      await convertImagesToBase64(filePath, path.join (outputDir, file))
      continue
    }

    if (path.extname (file).toLowerCase() === '.png' || path.extname (file).toLowerCase() === '.jpg' || path.extname (file).toLowerCase() === '.jpeg') {
      try {
        const bufferData = await fs.promises.readFile (filePath)
        const base64String = bufferData.toString ('base64')
        arr.push({
          name: file,
          url: `data:image ${path.extname (file)};base64,${base64String}`,
        })
        // console.log (`转换成功: ${filePath} -> ${newFilePath}`);
      }
      catch (err) {
        console.error (`转换失败: &#36;{filePath}, 错误: &#36;{err}`)
      }
    }
  }
  const newFilePath = path.join (outputDir, `base64.json`)
  fs.writeFileSync (newFilePath, `${JSON.stringify(arr)}\n`)
}

// 使用示例
const inputDir = 'd:/moon-web-start/public/img'
const outputDir = 'd:/moon-web-start/output'
convertImagesToBase64(inputDir, outputDir)

// 可优化一下变为输出一个arr直接放到dispose.js中使用
