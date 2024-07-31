import fs from 'node:fs'
import saveBase64Image from './convertBase64ToImage.js'

// 读取后端爬取的数据
const data = fs.readFileSync ('./detail.json', 'utf8')
const arr = JSON.parse(data)

// 创建一个可写流
const logStream = fs.createWriteStream('./src/preset.json', { flags: 'w' })

const arr1 = []

arr.forEach((item, index) => {
  saveBase64Image(item.avatarBase64, index)
})
arr.forEach((item, index) => {
  arr1.push({
    id: index + 2,
    name: item.title,
    // 个人分销码粘贴替换在此处
    url: `${item.url}?refer=1fa1da45-327e-4651-b13c-c73d21cc297f`,
    // url: `${item.url}?refer=fa4b95f2-5377-4703-b4d3-95b0951a272d`,
    desc: item.introduction,
    favicon: `/imgNew/image_${index}.jpg`,
  })
})
const arr2 = {
  data: [
    {
      id: 0,
      name: '小报童每日精选',
      groupList: [
        {
          id: 1,
          name: '小报童每日精选',
          siteList: [...arr1],
        },
      ],
    },
  ],
}
// 将信息写入到文件流
logStream.write(`${JSON.stringify(arr2)}\n`)
