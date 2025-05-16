# SaúdePróxima 🏥

Sistema para localizar unidades de saúde próximas, filtrando por tipo de estabelecimento e especialidade.  
**Backend**: Node.js (Express local + Serverless na Vercel) | **Banco de dados**: Neon.tech  

![Badge](https://img.shields.io/badge/Node.js-18.x-green) ![Badge](https://img.shields.io/badge/License-MIT-blue) ![Badge](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Funcionalidades
- Localização de unidades de saúde por proximidade geográfica  
- Filtros por tipo (hospitais, UPAs, centros de saúde) e especialidades  
- Integração com Google Maps para geolocalização  
- API RESTful para consulta de dados  

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 18.x ou superior  
- Conta no [Neon.tech](https://neon.tech/) (banco PostgreSQL criado)  
- (Opcional) Chave da [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding)

### Passo a passo
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/saudeproxima.git
   cd saudeproxima
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com:
   ```env
   NEON_DATABASE_URL=postgres://usuario:senha@ep-xxxxxx.us-east-2.aws.neon.tech/nome-do-banco?sslmode=require
   GOOGLE_MAPS_API_KEY=sua_chave_aqui
   ```

4. **Inicie o servidor**:
   ```bash
   node server.js
   ```
   Acesse: http://localhost:3000

---

## ☁️ Deploy na Vercel

1. **Instale a CLI da Vercel**:
   ```bash
   npm install -g vercel
   ```

2. **Faça login**:
   ```bash
   vercel login
   ```

3. **Configure as variáveis na Vercel**:
   - No painel do projeto > Settings > Environment Variables:
     - `NEON_DATABASE_URL` (valor do Neon.tech)  
     - `GOOGLE_MAPS_API_KEY` (sua chave)  

4. **Faça o deploy**:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Tecnologias
- **Backend**: Node.js | Express | Serverless (Vercel)  
- **Banco de dados**: PostgreSQL (Neon.tech)  
- **Geolocalização**: Google Maps API  
- **Versionamento**: Git + GitHub  

---

## ⚙️ Variáveis de Ambiente
| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `NEON_DATABASE_URL` | URL de conexão do Neon.tech | Sim |
| `GOOGLE_MAPS_API_KEY` | Chave para geocodificação de endereços | Não |

---

## 🤝 Como contribuir
1. Faça um fork do projeto  
2. Crie uma branch: `git checkout -b minha-feature`  
3. Commit suas mudanças: `git commit -m 'feat: Minha nova feature'`  
4. Push para a branch: `git push origin minha-feature`  
5. Abra um Pull Request  

---

---

*Desenvolvido com ❤️ por Felgosito*  