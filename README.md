# what-weather

Aplicacão react-native com finalidade de testar meus conhecimentos;

### Features
- [x] Permitir cadastrar vários endereços/cidades através do CEP
- [x] Permitir excluir cidades cadastradas
- [x] Mostrar horário da última consulta das informações
- [x] Salvar as cidades cadastradas em um storage local ou cache, permitindo fechar e reabrir a aplicação e manter as cidades cadastradas
- [x] Ao entrar na aplicação, atualizar todas as cidades e horário da última consulta
- [x] Criar evento de Pulldown (Puxar a tela para baixo com o dedo) na tela inicial das cidades, para atualizar as informações de temperatura de todas as cidades e horário de última consulta
- [x] Tratar erros de atualização, cadastro, exclusão, cep inexistente.

### Pré-requisitos
- React-native totalmente configurado ( O guia de instalação oficial está em: https://reactnative.dev/ )
- Um emulador ou celular
- npm ou yarn ( preferencia yarn )

### Install

- Acesse a pasta do projeto atraves de um terminal:
  $cd %seu_diretorio%/what-weather
  
- Execute os comandos:
  $yarn install
  $yarn android
  
- Para iniciar o aplicativo execute:
  $yarn start
  
### Obs
Caso as requests falhem é necessário verificar o arquivo what-weather/src/apis/cidadesApi.js e atualizar a apiKey para uma key valida;
