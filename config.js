// Configurações da landing page — edite apenas este arquivo.
window.SITE_CONFIG = {
  // Número do WhatsApp com DDI + DDD, só dígitos.
  whatsappNumber: "5591992093911",

  // Mensagem padrão que já aparece digitada quando a cliente abre o WhatsApp.
  whatsappMessage: "Olá! Vi o anúncio e gostaria de agendar um horário no Uma Linda Mulher.",

  // Mensagens por campanha. A página lê o parâmetro utm_campaign do link do anúncio
  // (configure no Gerenciador de Anúncios: utm_campaign={{campaign.name}}).
  // A chave é o nome da campanha em minúsculas, sem acento, com espaços trocados por "-".
  // Ex.: campanha "Alisamento Dezembro" -> "alisamento-dezembro".
  // Campanhas que não estiverem aqui usam a mensagem padrão + "(anúncio: <nome da campanha>)",
  // para o salão saber de onde a cliente veio.
  campaignMessages: {
    // "alisamento-dezembro": "Olá! Vi o anúncio de alisamento e gostaria de agendar um horário.",
  },

  // ID do Pixel da Meta (Gerenciador de Eventos). Deixe vazio para desativar.
  metaPixelId: "1722871092960929"
};
