// 将base64转为二进制
function dataURLtoBlob(base64) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// 压缩图片
export function compressImage(imageSrc, quality = 1) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let { width, height } = img;

      if (width <= 1920) {
        quality = 1;
      } else {
        height = (height * 1920) / width;
        width = 1920;
      }
      // 设置 canvas 的大小
      canvas.width = width;
      canvas.height = height;

      // 在 canvas 上绘制图片
      ctx.drawImage(img, 0, 0, width, height);

      // 将 canvas 上的图像数据压缩为 base64 格式
      const base64 = canvas.toDataURL('image/jpeg', quality);

      const fileBinary = dataURLtoBlob(base64);
      // 调用成功回调函数，并传递压缩后的图片数据
      resolve(fileBinary);
    };

    // 加载图片
    img.src = imageSrc;
  });
}
