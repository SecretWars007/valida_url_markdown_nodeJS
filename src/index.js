import fs from "fs";
import chalk from "chalk";

//const textoPrueba =
 // "Son generalmente generados a partir de un objeto [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList), el cuál es el resultado de la selección del archivo dado por el a través el elemento input[<input>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input), a partir del objeto [DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) utilizado en operaciones Drag and Drop o en español Arrastar y Soltar ó a partir de la API mozGetAsFile() en un [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).";
// para manejar el error
// function manejaError(error) {
//     console.log(error);
//     throw new Error(chalk.red(error));
// }

// path de la ruta del archivo sincrono
// function cargarArchivo(rutaArchivo){
//     const encoding = "utf-8";
//     fs.readFile(rutaArchivo, encoding, (error, texto) => {
//         if (error) {
//             manejaError(error);
//         }
//         console.log(chalk.green(texto));
//     });
// }
// path de la ruta del archivo asincrono
// function cargarArchivo(rutaArchivo) {
//     const encoding = "utf-8";
//     fs.promises.readFile(rutaArchivo, encoding)
//     .then((texto)=> console.log(chalk.green(texto)))
//     .catch((error) => manejaError(error));
// }
// path de la ruta del archivo async - await
// async function cargarArchivo(rutaArchivo) {
//   try {
//     const encoding = "utf-8";
//     const texto = await fs.promises.readFile(rutaArchivo, encoding);
//     console.log(chalk.green(texto));
//     const resultados = obtenerEnlaces(texto);
//     console.log(chalk.green(resultados));
//   } catch (error) {
//     manejaError(error);
//   } finally {
//     console.log(chalk.yellow("operación finalizada"));
//   }  
// }
function obtenerEnlaces(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const enlaces = [...texto.matchAll(regex)];
  const resultados = enlaces.map((enlace) => ({ [enlace[1]]: enlace[2] }));
  return resultados;
}

function manejarError(error) {
  //console.log(error);
  throw new Error(chalk.red(error));
}

async function cargarArchivo(rutaArchivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(rutaArchivo, encoding);
    const resultados = obtenerEnlaces(texto);
    return resultados.length !== 0 ? resultados : "No se encontraron enlaces";
  } catch (error) {
    manejarError(error);
  }
}

// llamar a la funcion
//cargarArchivo("./archivos/texto.md");
//obtenerEnlaces(textoPrueba);
// regex --> \[[^[\]]*?\]
// regex --> \(https?:\/\/[^\s?#.].[^\s]*\)
// regex --> \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

// CLI --> COMMAND LINE INTERFACE
export default cargarArchivo

