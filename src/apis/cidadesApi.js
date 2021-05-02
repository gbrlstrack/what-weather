import axios from 'axios';
const apiKey = '37ff7630';

export async function CONSULTA_CEP({ cep }) {
  return await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((result) => {
      return result.data;
    });
}

export async function CONSULTA_TEMPO({ cidade, uf }) {
  return await axios
    .get(
      `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cidade},${uf}`
    )
    .then((result) => {
      return result.data;
    });
}

export async function PRIMEIRA_CONSULTA() {
  return await axios
    .get(`https://api.hgbrasil.com/weather?key=${apiKey}user_ip=remote`)
    .then((result) => result.data);
}

export async function CONSULTA_CEP_BY_NOME({ nome, uf }) {
  return await axios
    .get(`https://viacep.com.br/ws/${uf}/${nome}/json/`)
    .then((result) => {
      return result.data;
    });
}
