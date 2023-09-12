const axios = require('axios');
const fs = require('fs');
// 发起 HTTP 请求并获取数据

const token = 'b915532327ed11a04880757b09f280abdefacd2d54f94aa3afda8785bc9b1456'

axios.get(" https://openapi.wolai.com/v1/databases/thWyFA43F9es5wShKVgKeB", {
  headers: {
    Authorization: token
  }
}).then(response => {
  // 处理并解析返回的数据
  const data = response.data;
  // 格式化 JSON 数据
  const formattedJson = JSON.stringify(data, null, 4);
  try {
    // 将数据保存为 JSON 文件
    fs.writeFileSync('data.json', formattedJson);
  } catch (err) {
    console.log('error');
  }
}).catch(error => {
  console.log('error');
});