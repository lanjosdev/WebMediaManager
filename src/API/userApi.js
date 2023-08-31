import axios from 'axios';

const api = require('./config.json');
export const API_URL = api.api_url;


//End-Points de USUÁRIO
// Logar usuário
export async function USER_LOGIN(email, password) {
   const response = await axios.post(API_URL + "/login", {
      "email": email,
      "password": password,
   })
   
   const token = response.data.data;
   return token; 
   //Nessa response vem o token que precisa ser salvo em localStorage ou cookies pra manter o usuário autenticado.
}

// Check Token
export async function CHECK_TOKEN(token) {

   await axios.get(API_URL + "api/checkToken", { headers: { Authorization: "Bearer " + token } })
       .then((response)=>{
         console.log(`Status da função CHECK TOKEN: ${response.status}`);
          return (response.status !== 200);
       });
}
 
// Lista todos os Usuários cadastrados
export async function USER_GET_ALL(token) {
   const response = await axios.get(API_URL + "/user", { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}

// Encontrar usuário por string
export async function USER_FIND_BY_STRING(text, token) {
   const response = await axios.get(API_URL + `/user/find/${text}`, { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}

// Encontrar usuário por ID
//CONFIRMAR COM O RENATO SE O IDENTIFICADOR É NUMBER OU STRING COMO APONTA NA DOCUMENTAÇÃO
export async function USER_FIND_BY_ID(id, token) {
   const response = await axios.get(API_URL + `/user/find${id}`, { headers: { Authorization: "Bearer " + token } })

   console.log(response)
}