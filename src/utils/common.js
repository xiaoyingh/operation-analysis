// /*
//     下载图表功能
//     @params: dom节点-class/id
//     @name：下载之后的名字
//     */
// import html2canvas from 'html2canvas'
// import canvas2Image from 'canvas2image.js'
// const downloadCode = (params) => {
//   const cntElem = document.querySelector(params)
//   const shareContent = cntElem
//   const width = shareContent.offsetWidth
//   const height = shareContent.offsetHeight
//   const canvas = document.createElement('canvas')
//   const scale = 2
//   canvas.width = width * scale
//   canvas.height = height * scale
//   canvas.getContext('2d').scale(scale, scale)
//   const ops = {
//     scale: scale,
//     width: width,
//     height: height,
//     // 跨域配置
//     useCORS: true, // 使用跨域
//     allowTaint: true, // 允许使用跨域资源
//     tainTest: false,
//     backgroundColor: null
//   }
//   html2canvas(shareContent, ops).then(canvas => {
//     const context = canvas.getContext('2d')
//     context.mozImageSmoothingEnabled = false
//     context.webkitImageSmoothingEnabled = false
//     context.msImageSmoothingEnabled = false
//     context.ImgSmoothingEnabled = false
//     // 保存图片，可以保存PNG，JPEG等，调用对应api即可
//     canvas2Image.saveAsPNG(canvas, canvas.width, canvas.height, name)
//   })
// }
//
// export { downloadCode }
