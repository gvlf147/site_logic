# 📸 Configuração da API do Instagram

Este guia explica como configurar a integração com a API do Instagram para exibir seus posts no site.

## 🎯 Opções de Integração

### **Opção 1: Instagram Basic Display API (Recomendado)**

#### **Passo 1: Criar um App no Facebook**
1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Clique em **"Meus Apps"** → **"Criar App"**
3. Escolha o tipo **"Consumer"** (para exibir conteúdo)
4. Preencha as informações do app

#### **Passo 2: Adicionar o Instagram Basic Display**
1. No dashboard do app, vá em **"Adicionar Produto"**
2. Encontre **"Instagram Basic Display"** e clique em **"Configurar"**
3. Clique em **"Criar novo app"**

#### **Passo 3: Configurar o App**
1. Em **Basic Display** → **Basic Info**:
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
2. Salve as alterações

#### **Passo 4: Adicionar Tester do Instagram**
1. Vá em **Roles** → **Instagram Testers**
2. Clique em **"Add Instagram Testers"**
3. Digite seu username do Instagram (@logicphire)
4. No app do Instagram, vá em:
   - **Configurações** → **Apps e Sites** → **Apps de Tester**
   - Aceite o convite

#### **Passo 5: Gerar Access Token**
1. Volte ao **Basic Display**
2. Em **User Token Generator**, clique em **"Generate Token"**
3. Faça login com sua conta @logicphire
4. Autorize as permissões
5. Copie o **Access Token** gerado

#### **Passo 6: Obter User ID**
1. Com o token em mãos, faça uma requisição:
```bash
curl -X GET "https://graph.instagram.com/me?fields=id,username&access_token=SEU_ACCESS_TOKEN"
```
2. Copie o **ID** retornado

#### **Passo 7: Converter para Long-Lived Token (60 dias)**
```bash
curl -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=SEU_APP_SECRET&access_token=SEU_SHORT_TOKEN"
```

#### **Passo 8: Configurar no Backend**
Edite o arquivo `backend/.env`:
```env
INSTAGRAM_ACCESS_TOKEN=seu_long_lived_token_aqui
INSTAGRAM_USER_ID=seu_user_id_aqui
```

#### **Passo 9: Renovar Token (a cada 60 dias)**
O token expira em 60 dias. Para renovar, você pode:
1. Usar o endpoint que criei: `GET /api/instagram/refresh`
2. Ou executar manualmente:
```bash
curl -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=SEU_CURRENT_TOKEN"
```

---

### **Opção 2: Usar Serviço Third-Party (Mais Simples)**

Se preferir não lidar com tokens e APIs, pode usar serviços prontos:

#### **SnapWidget (Gratuito)**
1. Acesse [SnapWidget.com](https://snapwidget.com/)
2. Escolha o layout "Grid"
3. Conecte sua conta @logicphire
4. Configure o design
5. Copie o código embed e substitua no componente

#### **Elfsight (Pago - $5/mês)**
1. Acesse [Elfsight.com](https://elfsight.com/instagram-feed-instashow/)
2. Conecte @logicphire
3. Personalize o widget
4. Copie o código de integração

#### **Juicer (Freemium)**
1. Acesse [Juicer.io](https://www.juicer.io/)
2. Adicione sua conta @logicphire
3. Escolha o plano (free até 1 fonte)
4. Integre no site

---

## 🚀 Status Atual

Por enquanto, o feed está funcionando com **posts mockados** (imagens bonitas de exemplo).

Quando você configurar o Access Token, o sistema irá:
- ✅ Buscar automaticamente os posts reais
- ✅ Atualizar a cada vez que alguém acessar o site
- ✅ Fazer fallback para mockados se houver erro
- ✅ Exibir caption, imagem e link corretos

---

## 📝 Teste Manual

Para testar se está funcionando:

1. **Reinicie o backend** (se já estiver rodando)
2. Acesse: `http://localhost:5000/api/instagram/posts`
3. Você deve ver os posts (mockados ou reais)
4. Acesse o site e role até a seção "Siga-nos no Instagram"

---

## 🔧 Solução de Problemas

### **Token expirou?**
- Tokens short-lived duram 1 hora
- Tokens long-lived duram 60 dias
- Renove usando o endpoint de refresh

### **Erro de permissões?**
- Certifique-se de estar como Instagram Tester
- Reautorize o app nas configurações do Instagram

### **Posts não aparecem?**
- Verifique se o token está correto no `.env`
- Veja os logs do backend (`console.log`)
- Posts mockados aparecem como fallback

---

## 💡 Dica

Para produção, considere:
- **Cache**: Salvar posts no banco e atualizar a cada X horas
- **Webhook**: Instagram notifica quando há novo post
- **CDN**: Servir imagens via CDN para performance

---

**Precisa de ajuda?** Me avise e eu te guio no processo! 🚀
