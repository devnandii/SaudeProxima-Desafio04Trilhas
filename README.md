+++markdown

# UBS Local🏥

Sistema para localizar unidades de saúde próximas com filtros por tipo de estabelecimento e especialidade.
**Stack**: Node.js | PostgreSQL (Neon.tech) | Serverless (Vercel)

![Node.js 18.x](https://img.shields.io/badge/Node.js-18.x-green)
![PostgreSQL 16.x](https://img.shields.io/badge/PostgreSQL-16.x-blue)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

---

## ✨ Funcionalidades

* **Geolocalização** de unidades de saúde via Google Maps API
* **Filtros avançados** por:

  * Tipo (Hospitais, UPAs, Centros de Saúde)
  * Especialidades médicas
  * Serviços disponíveis
* API Serverless com endpoints otimizados
* Banco de dados relacional escalável ([Neon.tech](https://neon.tech))

---

## 🛠️ Arquitetura

| Camada             | Tecnologias                                 |
| ------------------ | ------------------------------------------- |
| **Backend**        | Node.js, Serverless Functions (Vercel)      |
| **Banco de Dados** | PostgreSQL ([Neon.tech](https://neon.tech)) |
| **Geolocalização** | Google Maps Geocoding API                   |
| **Infra**          | Vercel (Deploy Automático + Edge Network)   |

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
```

---

## 🚀 Configuração Local

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/saude-proxima.git
   cd saude-proxima
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o banco Neon.tech**:

   * Crie um banco gratuito em [Neon.tech](https://neon.tech)
   * Execute o script SQL do arquivo `schema.sql`
   * Popule as tabelas com dados iniciais

4. **Configure o ambiente**:

   ```bash
   .env
   ```

   Edite o arquivo `.env` com suas credenciais:

   ```env
   # Neon.tech PostgreSQL
   NEON_DATABASE_URL="postgres://user:password@ep-cool-cloud-123456.us-east-2.aws.neon.tech/dbname"

   # Google Maps API
   GOOGLE_MAPS_API_KEY="sua_chave_aqui"
   ```

5. **Inicie o servidor**:

   ```bash
   vercel dev
   ```

   Acesse: [http://localhost:3000](http://localhost:3000)

---

### ✅ Principais ajustes de documentação

1. Hierarquia correta de cabeçalhos com `##`
2. Lista numerada para sequência lógica
3. Blocos de código específicos por linguagem (`bash`, `env`)
4. Links clicáveis com sintaxe markdown
5. Identação correta para listas aninhadas
6. Formatação consistente para nomes de arquivos (ex: `schema.sql`)
7. Separação clara entre comandos e explicações

+++
