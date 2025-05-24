import chalk from "chalk";

function obtenerEnlaces(links) {
    //console.log(typeof links);
    if (typeof links === 'object') {

        return links.map((objectLink) => Object.values(objectLink).join());
    }else{
        return links;
    }
}

async function verificarStatus(enlaces) {
    const listaStatus = Promise.all(enlaces.map(async (enlace) => {
       try {
            const response = await fetch(enlace);
            return response.status;
       } catch (error) {
            return manejarError(error);
       }
    }));
    return listaStatus;
}

function manejarError(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return "No existe el enlace";
    } else{
        return "Ocurrio un error";
    }
}

export default async function ValidarEnlaces(listaEnlaces){
    console.log("Validando...");
    const enlaces = obtenerEnlaces(listaEnlaces);
    const status = await verificarStatus(enlaces);
    return listaEnlaces.map((objeto, index) => {
        return {
            ...objeto,
            status: status[index]
        };
    });
}