export function fileToBase64(file: File): Promise<string> {
  const filePromise: Promise<string> = new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('No se pudo leer el archivo como Base64'));
      }
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });

  return filePromise;
}
