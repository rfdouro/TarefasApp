/**
 * ler fonte em
 *
 * https://davibaltar.medium.com/documenta%C3%A7%C3%A3o-autom%C3%A1tica-de-apis-em-node-js-eb03041c643b
 *
 * @type Module swagger-autogen|Module swagger-autogen
 */

const swaggerAutogen = require("swagger-autogen")();

//lê os endpoints desse arquivo
const endpointsFiles = ["./server.js"];
//gera a api-docs nesse arquivo
const outputFile = "./swagger.json";

/*
 * aqui gera a documentação apenas
 */
//swaggerAutogen(outputFile, endpointsFiles);

let hscheme = process.env.SHOST ? process.env.SHOST : "localhost";
let sscheme = process.env.SCHEME ? process.env.SCHEME : "http";

/*
 * aqui a documentação é gerada automaticamente e é iniciado o projeto
 * usa-se o comando:
 * npm run swagger-autogen
 */
swaggerAutogen(outputFile, endpointsFiles, {
  host: hscheme,
  schemes: [sscheme],
}).then(() => {
  require("./main.js");
});
