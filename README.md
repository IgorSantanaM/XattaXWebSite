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

React, TypeScript e Vite, com animações Motion e ícones Lucide. O conteúdo e os contatos ficam em `src/content.ts`. O WhatsApp foi informado pelo responsável pelo projeto: +55 67 933825699.

## Identidade visual

A logo enviada pelo responsável foi vetorizada por contornos, preservando o símbolo e as letras da imagem original. Os SVGs em `public/brand/` incluem versões escura, clara e uma aplicação sem a assinatura inferior para a composição decorativa. O favicon usa o símbolo do telhado.

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
