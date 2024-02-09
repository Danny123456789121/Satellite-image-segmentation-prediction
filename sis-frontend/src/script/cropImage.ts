const cropImage = (image: Blob, cropPadding: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(image);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Unable to get 2D context'));
        return;
      }

      const { width, height } = img;
      const cropWidth = width - cropPadding * 2;
      const cropHeight = height - cropPadding * 2;
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      context.drawImage(
        img,
        cropPadding,
        cropPadding,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight,
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Unable to create Blob'));
        }
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

export default cropImage;
