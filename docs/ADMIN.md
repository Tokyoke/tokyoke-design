## Área administrativa (/admin)

Os arquivos estão em `src/app/admin/...`.

- `/admin` — Dashboard Admin
	- Arquivo: `src/app/admin/page.tsx`
	- Propósito: visão geral administrativa (métricas, atalhos para gerenciamento).
	- Componentes/Módulos usados: `components/ui/card.tsx`, `components/ui/table.tsx`, `modules/_global/header.tsx`, `modules/_global/footer.tsx`.

- `/admin/cardapio` — Gerenciamento do cardápio
	- Arquivo: `src/app/admin/cardapio/page.tsx`
	- Propósito: CRUD dos itens do cardápio (criar, editar, remover, listar).
	- Componentes/Módulos usados: `components/ui/form.tsx`, `components/ui/input.tsx`, `components/ui/table.tsx`, `modules/menu/menu-item.tsx` (versão administrável).

- `/admin/reservas` — Gerenciamento de reservas
	- Arquivo: `src/app/admin/reservas/page.tsx`
	- Propósito: visualizar, confirmar, cancelar reservas feitas por clientes.
	- Componentes/Módulos usados: `components/ui/table.tsx`, `modules/profile/reservation/reservation-card.tsx` (adaptado para admin), ações (botões de confirmar/cancelar).

- `/admin/usuarios` — Gerenciamento de usuários
	- Arquivo: `src/app/admin/usuarios/page.tsx`
	- Propósito: gerenciar contas de usuários (clientes e possivelmente administradores).
	- Componentes/Módulos usados: `components/ui/table.tsx`, `components/ui/badge.tsx`, formulários de edição.

## Layouts e arquivos comuns

- Root/global:
	- `src/app/layout.tsx` (quando presente): define estrutura global do app.
	- `src/app/globals.css`: estilos globais.
- Layout público:
	- `src/app/(public)/layout.tsx`: wrapper para as rotas públicas (navegação para clientes, footer público).
- Layout admin:
	- `src/app/admin/layout.tsx`: wrapper e navegação lateral/top para áreas administrativas (proteção, menus, header admin).

## Componentes e módulos relevantes

- Componentes UI principais em `src/components/ui/` — exemplos:
	- `button.tsx`, `input.tsx`, `form.tsx`, `card.tsx`, `table.tsx`, `dialog.tsx`, `select.tsx`, `calendar.tsx`, `textarea.tsx`.
- Módulos reutilizáveis em `src/modules/` — exemplos:
	- `modules/auth/*`: lógica e componentes de autenticação (`sign-in`, `sign-up`).
	- `modules/home/*`: seções da home (hero, about-us, services).
	- `modules/menu/*`: itens e lista do cardápio.
	- `modules/profile/*`: informações e reservas do usuário.
	- `modules/_global/*`: header e footer compartilhados.

## Contrato simples (inputs/outputs esperados)

- Páginas de listagem (cardápio, reservas, usuários): esperam carregar arrays de recursos via fetch/API e exibir via `Table`/`Card`.
- Formulários (criar/editar): recebem dados do usuário e acionam endpoints REST/GraphQL para criar ou atualizar itens.
- Autenticação: páginas de auth enviam credenciais/registro para o backend e recebem tokens/session.

Observação: o repositório usa o App Router do Next.js (arquitetura baseada em `page.tsx` e `layout.tsx`) — adapte a comunicação com API conforme a camada de dados existente (fetch direto, hooks ou client services).

## Casos de borda e pontos de atenção

- Estados vazios: lidar com listas vazias (cardápio sem itens, sem reservas) mostrando CTA para criar conteúdo.
- Autorização: rotas em `/admin` devem exigir autenticação e checagem de permissão.
- Acessibilidade: garantir labels em formulários, foco nos componentes interativos e contrastes adequados.
- Internacionalização: textos estão em pt-BR; se houver suporte a múltiplos idiomas, mover strings para arquivos de i18n.

## Como estender / boas práticas

- Para adicionar uma nova página pública: criar a rota em `src/app/(public)/nome-da-rota/page.tsx` + `layout.tsx` se precisar de estrutura própria.
- Para adicionar uma nova página admin: criar `src/app/admin/nova-rota/page.tsx` e, se necessário, utilizar `src/app/admin/layout.tsx` para manter a navegação.
- Reutilize componentes em `src/components/ui/` e módulos em `src/modules/` para evitar duplicação.

## Caminho rápido — arquivos citados

- Páginas públicas:
	- `src/app/(public)/layout.tsx`
	- `src/app/(public)/page.tsx`
	- `src/app/(public)/auth/page.tsx`
	- `src/app/(public)/cardapio/page.tsx`
	- `src/app/(public)/perfil/page.tsx`
	- `src/app/(public)/reservas/page.tsx`
- Admin:
	- `src/app/admin/layout.tsx`
	- `src/app/admin/page.tsx`
	- `src/app/admin/cardapio/page.tsx`
	- `src/app/admin/reservas/page.tsx`
	- `src/app/admin/usuarios/page.tsx`
- Componentes e módulos:
	- `src/components/ui/*`
	- `src/modules/*`

## Notas finais e suposições

1. Suposições feitas:
	 - Este projeto utiliza o Next.js (App Router) e o roteamento conforme a estrutura de pastas mostrada.
	 - A comunicação com backend é feita via fetch/serviços HTTP; endpoints exatos não estavam presentes no repositório lido.
2. Se quiser, posso:
	 - Gerar um diagrama simples de rotas.
	 - Adicionar checklists para revisão de acessibilidade e testes.
	 - Criar um README em inglês ou um sumário em `README.md` na raiz integrando esta documentação.

---

Arquivo gerado automaticamente: `docs/ADMIN.md` — atualize conforme novas rotas ou refatorações.

## Imagens na pasta `design/admin/`

- `design/admin/dashboard.png` — Screenshot/arte do dashboard (sugestão alt: "Dashboard administrativo"). Uso: documentação/admin UI.
- `design/admin/cardapio.png` — Imagem do cardápio na visão admin (sugestão alt: "Cardápio — admin"). Uso: seção de gerenciamento do cardápio.
- `design/admin/cardapio-item.png` — Arte de item do cardápio (sugestão alt: "Item do cardápio — admin"). Uso: formulário/visualização de item.
- `design/admin/reservas.png` — Tela de reservas (sugestão alt: "Reservas — admin"). Uso: seção de gerenciamento de reservas.
- `design/admin/usuarios.png` — Tela de usuários (sugestão alt: "Usuários — admin"). Uso: seção de gerenciamento de usuários.

## Duplicatas observadas

Algumas imagens aparecem tanto em `public/` quanto em `design/` (ex.: ícones em `public/` e assets de design em `design/public/`). Recomenda-se manter os assets usados pela aplicação em `public/` e manter as imagens de design/bruto em `design/` para referência.
