# SaúdePróxima 🏥

Sistema para localizar unidades de saúde próximas com filtros por tipo de estabelecimento e especialidade.  
**Stack**: Node.js | PostgreSQL (Neon.tech) | Serverless (Vercel)

![Badge](https://img.shields.io/badge/Node.js-18.x-green) ![Badge](https://img.shields.io/badge/PostgreSQL-16.x-blue) ![Badge](https://img.shields.io/badge/Deploy-Vercel-black)

---

## ✨ Funcionalidades
- **Geolocalização** de unidades de saúde via Google Maps API
- **Filtros avançados** por:
  - Tipo (Hospitais, UPAs, Centros de Saúde)
  - Especialidades médicas
  - Serviços disponíveis
- API Serverless com endpoints otimizados
- Banco de dados relacional escalável ([Neon.tech](https://neon.tech/))

---

## 🛠️ Arquitetura
| Camada          | Tecnologias                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **Backend**     | Node.js, Serverless Functions (Vercel)                                      |
| **Banco de Dados** | PostgreSQL ([Neon.tech](https://neon.tech/))                               |
| **Geolocalização** | Google Maps Geocoding API                                                 |
| **Infra**       | Vercel (Deploy Automático + Edge Network)                                  |

---

## 🏗️ Estrutura do Projeto
```plaintext
saude-proxima/
├── api/
│   ├── busca.js          # Endpoint de busca geográfica
│   ├── tipos.js          # Lista tipos de unidades
│   └── especialidades.js # Lista especialidades
├── db/
│   └── pool.js           # Configuração do Neon.tech
├── public/
│   ├── components/       # Componentes reutilizáveis
│   ├── css/              # Folhas de estilo
│   ├── js/               # Lógica do cliente
│   ├── imagens/          # Assets visuais
│   └── *.html            # Páginas do frontend
├── .env                  # Variáveis de ambiente
├── vercel.json           # Configuração do Vercel
└── server.js             # Servidor Express

🚀 Configuração Local
1. Clone o repositório
bash

git clone https://github.com/seu-usuario/saude-proxima.git
cd saude-proxima

2. Instale as dependências
bash

npm install

3. Configure o Neon.tech

    Crie um banco gratuito em Neon.tech

    Execute o script SQL do arquivo schema.sql

    Popule as tabelas com dados iniciais

4. Configure o ambiente

    Crie uma cópia do arquivo .env.example:

bash

cp .env.example .env

    Edite com suas credenciais:

bash

# Neon.tech PostgreSQL
NEON_DATABASE_URL="postgres://user:password@ep-cool-cloud-123456.us-east-2.aws.neon.tech/dbname"

# Google Maps API
GOOGLE_MAPS_API_KEY="sua_chave_aqui"

5. Inicie o servidor
bash

npx vercel dev

Acesse: http://localhost:3000
☁️ Deploy na Vercel

    Conecte seu repositório GitHub à Vercel

    Configure as variáveis de ambiente:

        NEON_DATABASE_URL (Connection string do Neon)

        GOOGLE_MAPS_API_KEY (Chave da API do Google)

    O deploy será automático a cada push!

Deploy com Vercel
📚 Documentação

    Neon.tech Docs

    Vercel Serverless Functions

    Google Maps API

Contribuições são bem-vindas!
Reportar Issue | Sugerir Melhoria


Principais melhorias:
- Remoção de elementos redundantes ("text" soltos)
- Formatação consistente de código e listas
- Adição de placeholders para URLs reais
- Detalhamento das variáveis de ambiente
- Links de contribuição no footer
- Diagrama de estrutura mais limpo
- Sequência lógica de configuração
