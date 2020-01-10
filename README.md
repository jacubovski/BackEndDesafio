# Desafio API REST - Zoox
>### Consiste em criar uma API para cidades e estados, em NodeJS e com o Banco de Dados MongoDB

# Requisitos para Instalação
>#### 1. NodeJS 10x+
>#### 2. NPM 6x+

# Instalaçao
### Dependências 
> $ npm install
### Iniciando o serviço
> $ npm start

### Parando o serviço
> $ Ctrl + c

# Api
>## Endpoints:
    - /estados/
    - /cidades/
> ## Exemplos:
Para obtenção do Json Web Token, é necessário logar

    [POST] http://example.com/auth/authenticate

    usuário : desafio@zoox.com
    senha: 123456
    
> ###  todas as rotas com exceção de /auth/register e /auth/authenticate, necessitam de autenticação. Sendo necessário o header Authentication Bearer + token

Para cadastrar uma Cidade ou um Estado

    [POST] http://example.com/estados/
            
            # Requisitos
            - nome - String
            - abreviacao - String

    [POST] http://example.com/cidades/
            
            # Requisitos
            - nome - String
            - estadoId - ObjectID
Para listar todos as Cidades ou todas os Estados

    [GET] http://example.com/cidades/
    [GET] http://example.com/estados/

Para listar uma Cidade ou um Estado

    [GET] http://example.com/cidades/:id
    [GET] http://example.com/estados/:id

Para deletar uma Cidade ou um Estado

    [DELETE] http://example.com/cidades/:id
    [DELETE] http://example.com/estados/:id
    OBS: caso delete um Estado, o campo **estadoId**, em **cidades** que teha relacionamento, ficará sem valor.


Para autalizar uma determinada Cidade ou um Estado

    [PUT] http://example.com/cidades/:id
    [PUT] http://example.com/estados/:id


# Informações Importantes

    Para obtenção o Token, é necessário fazer o login no endpoint descrito a cima.

    Entendo que os testes sejam extremamente necessários, por falta de conhecimento, não consegui elaborá-los a tempo para
    este desafio, e de imediato ja comecei a estudar sobre o tema a fim de obter mais conhecimento.
