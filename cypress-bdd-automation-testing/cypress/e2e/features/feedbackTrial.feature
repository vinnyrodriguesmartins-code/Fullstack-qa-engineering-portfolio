# language: pt

Funcionalidade: Feedback Trial

  Cenário: Caso 1 - Exibir formulário de avaliação no período de trial
    Dado que o usuário acessa a aba Aprender
    Quando o usuário clica no botão "Trial"
    Então deve ser exibido o formulário de avaliação

  Esquema do Cenário: Caso 2 - Avaliar "<nota>" e comentário
    Dado que o usuário acessa a avaliação de trial
    Quando o usuário seleciona a "<nota>", "<intencaoCompra>" e adiciona seu comentário
    Então o sistema deve exibir "<Mensagem>" de sucesso

    Exemplos:
      | nota      | intencaoCompra | Mensagem                        |
      | Péssima   |                | Obrigado!                       |
      | Ruim      |                | Obrigado!                       |
      | Regular   |                | Obrigado!                       |
      | Boa       | Sim            | Agradecemos pela sua confiança! |
      | Excelente | Talvez         | Obrigado!                       |
      | Excelente | Não            | Obrigado!                       |

  Cenário: Caso 3 - Exibir mensagem de erro ao tentar avançar sem preencher os campos
    Dado que o usuário acessa a avaliação de trial
    Quando o usuário clica no botão "Próximo" sem preencher os campos
    Então deve ser exibida uma mensagem de alerta sobre o preenchimento obrigatório