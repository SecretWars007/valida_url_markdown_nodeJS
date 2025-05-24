import chalk from "chalk";
import cargarArchivo from "./index.js";
import fs from "fs";
import ValidarEnlaces from "./http-valid.js";

const camino = process.argv;

async function mostrarDatos(validar, enlaces, archivo) {
    if (validar) {
        console.log(
            chalk.green("Validacion de enlaces: "),
            chalk.black.bgGreen(archivo), 
            await ValidarEnlaces(enlaces)
        );
    } else {
        console.log(
          chalk.green("Lista de enlaces: "),
          chalk.black.bgGreen(archivo),
          enlaces
        );    
    }
    
}

async function procesarTexto(argumentos) {
    const camino = argumentos[2];
    const validate = argumentos[3] === "--validate";
    //console.log(validate);
    try {
        fs.lstatSync(camino);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log(chalk.red("El archivo o directorio no existe"));
            return; 
        }        
    }
    if (fs.lstatSync(camino).isFile()) {
        const enlaces = await cargarArchivo(camino);
        //console.log(chalk.green("Lista de enlaces: "), enlaces);
        mostrarDatos(validate,enlaces, camino);
        //console.log("Archivo");
    } else if (fs.lstatSync(camino).isDirectory()) {
        //console.log("Directorio");
        const archivos = await fs.promises.readdir(camino);
        //console.log(archivos);
        archivos.forEach(async (nombreArchivo) => 
        {
          const enlaces = await cargarArchivo(`${camino}${nombreArchivo}`);
          //console.log(chalk.green("Lista de enlaces: "), enlaces);
           mostrarDatos(validate, enlaces, `${camino}${nombreArchivo}`); 
        });
    }
   
}

procesarTexto(camino);