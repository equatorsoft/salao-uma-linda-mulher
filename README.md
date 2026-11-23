# Salão de Beleza Uma Linda Mulher — landing page

Landing page do salão para campanhas de anúncios na Meta (Instagram/Facebook).
É um site estático (HTML + CSS + um pouco de JavaScript), sem build: basta abrir o `index.html`.

- Endereço: Rua das Flores, 55 – Conjunto Girassol, Águas Brancas, Ananindeua – PA
- Horário: todos os dias, das 8h às 22h
- WhatsApp: (91) 99209-3911
- Instagram: [@salaodebeleza.umalindamulher](https://www.instagram.com/salaodebeleza.umalindamulher/)

## O que editar

Quase tudo fica em **`config.js`**:

| Campo | Para que serve |
|---|---|
| `whatsappNumber` | Número usado em todos os botões "Agendar" (DDI + DDD, só dígitos). |
| `whatsappMessage` | Mensagem que já aparece digitada no WhatsApp. |
| `campaignMessages` | Mensagem do WhatsApp específica para cada campanha (opcional). |
| `metaPixelId` | ID do Pixel da Meta. Vazio = Pixel desligado. |

### Mensagem do WhatsApp por campanha

No Gerenciador de Anúncios, em cada anúncio: **Rastreamento → Parâmetros de URL** →
`utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}`.

- Sem nada configurado, a mensagem fica: *"Olá! Vi o anúncio e gostaria de agendar um horário no Uma Linda Mulher. (anúncio: Nome da Campanha)"* —
  assim o salão sabe de qual campanha a cliente veio.
- Para uma mensagem própria, adicione em `campaignMessages` (nome da campanha em minúsculas, sem acento, com `-`):
  ```js
  campaignMessages: {
    "alisamento-dezembro": "Olá! Vi o anúncio de alisamento e gostaria de agendar um horário.",
  },
  ```
- Quem chega sem anúncio (Instagram, Google) recebe a mensagem padrão.

### Fotos ("Antes e depois" e "Nossos trabalhos")

Ficam em `assets/trabalhos/`, em WebP, em dois tamanhos (`-300`/`-600` na galeria, `-360`/`-720` no antes e depois).
Cada foto da galeria abre o reel correspondente no Instagram — o link e o texto alternativo estão no `index.html`,
na seção `<!-- GALERIA -->`. Para trocar uma foto, substitua os dois arquivos mantendo o nome (proporção 2:3, em pé).

### Meta Pixel

1. No Gerenciador de Eventos da Meta, crie um Pixel (conjunto de dados) e copie o ID (só números).
2. Coloque em `metaPixelId: "1234567890"`.
3. Eventos enviados:
   - `PageView` — ao abrir a página;
   - `Contact` (padrão) e `WhatsAppClick` (personalizado) — a cada clique em um botão de WhatsApp,
     com o parâmetro `origin` indicando qual botão foi clicado (hero, servicos, botao-flutuante…).

   Use `Contact` como evento de conversão nas campanhas. Cliques nas fotos da galeria geram `InstagramClick`.
   Todos os eventos levam o parâmetro `campaign` (ou `organico`).

## Publicação (GitHub Pages)

O workflow `.github/workflows/pages.yml` publica o site a cada push na branch `main`.
Na primeira vez, ative em **Settings → Pages → Source: GitHub Actions**.

URL: https://equatorsoft.github.io/salao-uma-linda-mulher/

Domínio próprio (opcional): crie um arquivo `CNAME` com o domínio (ex.: `umalindamulher.com.br`)
e aponte o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## SEO

- `robots.txt` e `sitemap.xml` estão na raiz do site. No endereço `equatorsoft.github.io/salao-uma-linda-mulher/`
  o Google não lê o `robots.txt` (ele precisa estar na raiz do domínio), então envie o sitemap pelo
  [Google Search Console](https://search.google.com/search-console). Com domínio próprio, os dois passam a valer direto.
- Ao trocar de domínio, atualize as URLs em `index.html` (`canonical`, `og:url`, `og:image`, JSON-LD),
  `robots.txt` e `sitemap.xml`.
- O que mais ajuda nas buscas locais é o **Perfil da Empresa no Google** apontando para este site.

## Localização

Coordenadas do salão: `-1.397611, -48.370887`. Elas são usadas no mapa incorporado, no botão "Como chegar"
(rota do Google Maps até o salão) e nos dados estruturados (`geo`) do `index.html`. Se o salão mudar de lugar,
troque as três ocorrências.

## Privacidade e cookies (LGPD)

- `privacidade.html`: aviso de privacidade e cookies (link no rodapé de todas as páginas).
- `consent.js`: banner com **Aceitar** e **Recusar** no mesmo destaque. O Meta Pixel **só carrega depois do aceite**;
  a escolha fica no navegador da pessoa (`localStorage`, chave `ulm-consent-v1`) e pode ser mudada em
  "Preferências de cookies". Ao recusar depois de aceitar, os cookies `_fbp`/`_fbc` são apagados e a página recarrega.
- O mapa do Google só é carregado quando a pessoa clica em "Mostrar mapa".
- Consequência: quem recusa não aparece nas métricas do Pixel.
- Ao mudar algo que coleta dados (novo script, formulário, outro pixel), atualize `privacidade.html` e a data no topo.
- Isto segue o Guia de Cookies da ANPD e os Termos das Ferramentas de Negócios da Meta, mas não é aconselhamento jurídico.

## Fontes

As fontes (Poppins e Great Vibes) estão em `assets/fonts/`, servidas pelo próprio site — não há chamadas ao Google Fonts.

## Testar localmente

```sh
npx serve .
```
