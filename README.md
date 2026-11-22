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
| `instagramPosts` | Links de posts do Instagram exibidos em "Nossos trabalhos". |
| `metaPixelId` | ID do Pixel da Meta. Vazio = Pixel desligado. |

### Posts do Instagram em "Nossos trabalhos"

1. No Instagram, abra o post → `...` → **Copiar link**.
2. Cole em `instagramPosts`, um por linha, entre aspas e com vírgula:
   ```js
   instagramPosts: [
     "https://www.instagram.com/p/AAAAAAAAAAA/",
     "https://www.instagram.com/p/BBBBBBBBBBB/",
   ],
   ```
3. No celular os posts aparecem num carrossel (arrastar para o lado); no computador, em grade com os 6 primeiros.
   A ordem da lista é a ordem na página. Evite passar de ~9: cada post incorporado deixa a página mais pesada.

Os posts são carregados só quando a pessoa rola até a seção, para a página abrir rápido.
Se a lista estiver vazia, aparece um cartão que leva direto para o perfil.

### Meta Pixel

1. No Gerenciador de Eventos da Meta, crie um Pixel (conjunto de dados) e copie o ID (só números).
2. Coloque em `metaPixelId: "1234567890"`.
3. Eventos enviados:
   - `PageView` — ao abrir a página;
   - `Contact` (padrão) e `WhatsAppClick` (personalizado) — a cada clique em um botão de WhatsApp,
     com o parâmetro `origin` indicando qual botão foi clicado (hero, servicos, botao-flutuante…).

   Use `Contact` como evento de conversão nas campanhas.

## Publicação (GitHub Pages)

O workflow `.github/workflows/pages.yml` publica o site a cada push na branch `main`.
Na primeira vez, ative em **Settings → Pages → Source: GitHub Actions**.

URL: https://equatorsoft.github.io/salao-uma-linda-mulher/

Domínio próprio (opcional): crie um arquivo `CNAME` com o domínio (ex.: `umalindamulher.com.br`)
e aponte o DNS conforme a [documentação do GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Testar localmente

```sh
npx serve .
```
