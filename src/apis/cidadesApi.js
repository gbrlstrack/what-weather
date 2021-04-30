import axios from 'axios';

export async function CONSULTA_CEP({ cep }) {
  return await axios
    .get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log('error na api', error);
    });
}

export async function CONSULTA_TEMPO({ cidade, uf }) {
  const apiKey = '5471c80a';
  return await axios
    .get(
      `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cidade},${uf}`
    )
    .then((result) => {
      return result.data;
    });
}
