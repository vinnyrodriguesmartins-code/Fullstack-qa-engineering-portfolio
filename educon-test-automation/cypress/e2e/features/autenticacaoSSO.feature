# language: pt

Funcionalidade: Autenticação via SSO

  Cenário: Caso 1 - Redirecionamento para página de login SSO
    Dado que o usuário está na página inicial do sistema
    Quando o usuário clica no botão "Entrar com SSO"
    Então o sistema deve redirecioná-lo para a página de login SSO

  Cenário: Caso 2 - Login via SSO com autenticação bem-sucedida e VPN conectada
    Dado que o usuário está na página inicial de login e está conectado à VPN
    Quando o usuário preencher os campos de email e senha e clica no botão "Entrar"
    Então o sistema deve exibir a área logada

  Cenário: Caso 3 - Login via SSO com credenciais inválidas
    Dado que o usuário está na página de login do SSO
    Quando o usuário preenche os campos de email e senha com credenciais inválidas e clica no botão "Entrar"
    Então o sistema deve exibir a mensagem de erro "Unauthorized"

  Cenário: Caso 4 - Redirecionamento para página de login SSO ao tentar acessar rota protegida sem autenticação
    Dado que o usuário está na página inicial da Afya
    Quando o usuário clica no link "Dashboard"
    Então o sistema deve redirecionar para o login SSO ao tentar acessar rota privada sem autenticação

  Cenário: Caso 5 - Logout e redirecionamento para a página inicial
    Dado que o usuário está logado no sistema
    Quando o usuário clica no botão "Sair"
    Então o sistema deve deslogar o usuário e redirecionar para a página inicial