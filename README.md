# XattaXWebSite

Site institucional da XattaX, escritório de apoio imobiliário e contábil em Campo Grande, MS.

Site: https://igorsantanam.github.io/XattaXWebSite/

## Desenvolvimento

Requer Node.js 22.12 ou superior.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

React, TypeScript e Vite, com ícones Lucide. O conteúdo de serviços e os contatos ficam em `src/content.ts`; as páginas institucionais ficam em `src/App.tsx`. O WhatsApp foi informado pelo responsável pelo projeto: +55 67 33825699.

## Estrutura institucional

Páginas: início, sobre nós, serviços, abrir empresa, trocar de contador, contato e privacidade. `src/page-meta.json` centraliza títulos, descrições e caminhos. O comando de build executa `scripts/build-pages.mjs` para criar um HTML de entrada por página, permitindo acessar e atualizar URLs internas diretamente no GitHub Pages. Cada página tem canonical e metadados próprios.

A referência de organização foi o modelo M2404 do Sitecontabil, com textos próprios para a XattaX. A página de abertura de empresa inclui um link para orientações gerais da Redesim. Não há promessa de prazo, economia tributária ou contratação automática.

## Identidade visual

A logo enviada pelo responsável foi vetorizada por contornos, preservando o símbolo e as letras da imagem original. Os SVGs em `public/brand/` incluem versões escura e clara. O favicon usa o símbolo do telhado. A antiga composição interativa foi removida.

A imagem `public/images/contabilidade.jpg` é uma imagem ilustrativa gerada para o site: representa uma situação genérica de trabalho contábil, e não uma fotografia do escritório ou da equipe da XattaX.

A referência está em `design/xattax-reference.jpg`. Para regenerar os vetores, execute `python scripts/vectorize-logo.py` com Pillow instalado.

## Publicação

O workflow `.github/workflows/deploy.yml` gera e publica o site no GitHub Pages a cada atualização da branch `main`. Nas configurações do repositório, Pages usa GitHub Actions. A configuração de Pages determina automaticamente o caminho público dos arquivos.

`dist/` é gerado durante a publicação e não precisa ser versionado. Para reproduzir a versão de produção localmente no PowerShell:

```powershell
$env:PAGES_BASE_PATH='/XattaXWebSite/'
npm run build
npm run preview
```

O site não recebe documentos nem envia mensagens automaticamente. Os botões de contato abrem o WhatsApp com texto revisável pelo visitante.
