# CryptoBot Node.js

O **CryptoBot** é um bot simples de criptomoedas desenvolvido em Node.js, utilizando as bibliotecas **axios** para requisições HTTP e **crypto** para geração de assinaturas HMAC. Este bot é projetado para operar na testnet da Binance e implementa uma estratégia básica de compra e venda com base em médias móveis simples (SMA).

## Configuração

Antes de usar o bot, certifique-se de configurar as seguintes variáveis no início do arquivo `index.js`:

- **SYMBOL**: O par de criptomoedas que o bot irá negociar (por exemplo, 'BTCUSDT').
- **BUY_PRICE**: O preço de compra desejado.
- **SELL_PRICE**: O preço de venda desejado.
- **QUANTITY**: A quantidade de criptomoeda a ser comprada ou vendida.
- **API_KEY**: Sua chave de API da Binance.
- **SECRET_KEY**: Sua chave secreta de API da Binance.

## Instalação

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório.
3. Execute `npm install` para instalar as dependências.

## Uso

1. Inicie o bot executando `node index.js`.
2. O bot verificará periodicamente as condições de mercado e executará ordens com base na estratégia definida.

## Estratégia

O bot implementa uma estratégia simples com base em médias móveis simples (SMA):

- Se o preço cair abaixo do valor de compra e o bot não tiver uma posição aberta, ele realizará uma compra.
- Se o preço subir acima do valor de venda e o bot tiver uma posição aberta, ele realizará uma venda.

## Aviso

Este bot é projetado para fins educacionais e de teste na testnet da Binance. Use-o com cuidado e entenda os riscos associados à negociação de criptomoedas. Não me responsabilizo por quaisquer perdas incorridas.
