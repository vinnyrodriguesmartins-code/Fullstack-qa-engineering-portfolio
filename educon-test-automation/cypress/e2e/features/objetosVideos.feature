# language: pt

Funcionalidade: Objetos Videos

  Cenário: Caso 1 - Funcionalidades do player de vídeo
    Dado que o usuário está logado no sistema na sessão vídeos
    Quando o usuário inicia a reprodução de um vídeo
    Então as funcionalidades devem ser visíveis e funcionais

  Cenário: Caso 2 - Apresentar feedback de erro ao acessar URL inválida
    Dado que o usuário está logado no sistema na sessão vídeos
    Quando o usuário acessa uma URL de video inválida
    Então o sistema deve apresentar uma mensagem clara de erro ao aluno

  Cenário: Caso 3 - Exibição do vídeo por capítulos
    Dado que o usuário acessa página de vídeo por capitulos
    Quando o usuário clica no botão "Capítulos" e os capítulos disponíveis devem ser exibidos
    Então o vídeo deve permitir a navegação ao clicar em cada capítulo




