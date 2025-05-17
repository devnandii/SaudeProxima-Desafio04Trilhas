# SaúdePróxima 🏥

Sistema para localizar unidades de saúde próximas com filtros por tipo de estabelecimento e especialidade.  
**Stack**: Node.js + Express.js | PostgreSQL (Neon.tech) | Serverless (Vercel)

![Badge](https://img.shields.io/badge/Node.js-18.x-green) ![Badge](https://img.shields.io/badge/Express-4.x-lightgrey) ![Badge](https://img.shields.io/badge/PostgreSQL-16.x-blue) ![Badge](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Funcionalidades
- Geolocalização de unidades de saúde via Google Maps API
- Filtros avançados por:
  - Tipo (Hospitais, UPAs, Centros de Saúde)
  - Especialidades médicas
  - Serviços disponíveis
- API RESTful com endpoints para consulta de dados
- Banco de dados relacional escalável (Neon.tech)

---

## 🛠️ Tecnologias
| Camada          | Tecnologias                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **Backend**     | Node.js, Express.js, Serverless Framework                                   |
| **Banco de Dados** | PostgreSQL ([Neon.tech](https://neon.tech/))                               |
| **Geolocalização** | Google Maps Geocoding API                                                 |
| **Deploy**      | Vercel (Serverless Functions)                                              |

---

## 🏗️ Estrutura do Banco de Dados
![Diagrama](https://via.placeholder.com/800x400.png?text=Diagrama+do+Banco+de+Dados)

```sql
-- Tabela de Tipos de Unidade
CREATE TABLE tipo_unidade (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela de Serviços
CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela Principal de Unidades
CREATE TABLE unidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco TEXT,
    coordenadas GEOMETRY(Point, 4326),
    telefone VARCHAR(20),
    tipo_id INTEGER REFERENCES tipo_unidade(id)
);

-- Tabela de Relacionamento Unidade-Serviço
CREATE TABLE unidade_servico (
    unidade_id INTEGER REFERENCES unidades(id),
    servico_id INTEGER REFERENCES servicos(id),
    PRIMARY KEY (unidade_id, servico_id)
);
```

---

## 🚀 Configuração Local

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/saude-proxima.git
cd saude-proxima
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Neon.tech
1. Crie um banco gratuito em [Neon.tech](https://neon.tech/)
2. Execute o script SQL fornecido acima
3. Popule as tabelas com dados iniciais:
```sql
-- Exemplo: Inserir tipos de unidades
INSERT INTO tipo_unidade (nome) VALUES 
('Hospital Geral'),
('UPA'),
('Centro de Saúde');
```

### 4. Configure o .env
```env
NEON_DATABASE_URL="postgres://user:pass@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require"
GOOGLE_MAPS_API_KEY="sua_chave"
PORT=3000
```

### 5. Inicie o servidor Express
```bash
npm start
```
Acesse: http://localhost:3000/api/unidades

---
**Exemplo de Requisição**:
```bash
curl http://localhost:3000/api/proximas?lat=-2.523&lng=-44.236
```

---

## ☁️ Deploy na Vercel
1. Instale a CLI:
```bash
npm install -g vercel
```

2. Configure as variáveis:
```bash
vercel env add NEON_DATABASE_URL
vercel env add GOOGLE_MAPS_API_KEY
```

3. Deploy:
```bash
vercel --prod
```

---

## 📚 Documentação Adicional
- [Neon.tech Docs](https://neon.tech/docs)
- [Express.js Guide](https://expressjs.com/)
- [Google Maps API](https://developers.google.com/maps/documentation)

---

## 📄 Licença  
MIT License - Consulte [LICENSE](LICENSE) para detalhes.
