const returnAPI = async () => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiJson = await api.json();
  delete apiJson.USDT;
  const codigos = Object.entries(apiJson).map((element) => element[1].code);
  return codigos;
};

export default returnAPI;
