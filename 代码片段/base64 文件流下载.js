/**
 * desc: base64转文件并下载
 * @param {string} base64 base64数据
 * @param {string} fileName 文件名
 * @param {string} mimetype blob对象
 */
downloadFile(base64, fileName, mimetype) {
  const blob = this.base64ToBlob(base64, mimetype) // 转成blob对象
  this.downloadExportFile(blob, fileName) // 下载文件
},
downloadExportFile(blob, fileName) {
  const downloadElement = document.createElement('a')
  let href = blob
  if (typeof blob === 'string') {
    downloadElement.target = '_blank'
  } else {
    href = window.URL.createObjectURL(blob) // 创建下载的链接
  }
  downloadElement.href = href
  downloadElement.download = fileName // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 触发点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  if (typeof blob !== 'string') {
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
},
//将base64转换为blob
base64ToBlob(base64, mime) {
  const raw = window.atob(base64) // 解码base64得到二进制字符串
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
  }
  return new Blob([uInt8Array], { type: mime })
}