# language: pt

Funcionalidade: Emissão e Download de Certificados
  Como um aluno autenticado no portal
  Quero emitir e fazer o download do certificado de conclusão de cursos
  Para comprovar minhas horas de estudo e conclusão de disciplinas

  Contexto:
    Dado que o aluno está autenticado e na tela de certificados

  Cenário: Emissão de certificado com sucesso
    Dado que o aluno concluiu o curso "Desenvolvimento Web Avançado" com 100% de progresso
    Quando o aluno solicita a emissão do certificado
    Então o certificado deve ser gerado com sucesso
    E o arquivo PDF deve ser baixado com o nome contendo "certificado-desenvolvimento-web"

  Cenário: Impedir emissão de certificado para curso incompleto
    Dado que o aluno está cursando "Banco de Dados NoSQL" com apenas 60% de progresso
    Quando o aluno tenta gerar o certificado para este curso
    Então o botão de emissão deve estar desabilitado
    E o sistema deve exibir a mensagem de aviso "Progresso mínimo necessário: 100%"

  Cenário: Tratamento de falha no servidor ao gerar certificado
    Dado que o aluno concluiu o curso "Segurança da Informação"
    Mas a API de emissão de certificados está instável e retorna erro 500
    Quando o aluno solicita a emissão do certificado
    Então o sistema deve exibir uma notificação de erro informando "Serviço temporariamente indisponível. Tente novamente mais tarde"

  Cenário Esquema: Validar informações obrigatórias exibidas no certificado
    Dado que o aluno seleciona para visualizar os detalhes do certificado do curso "<curso>"
    Quando a tela de visualização do certificado é carregada
    Então os campos de identificação devem exibir os dados corretos:
      | Campo            | Valor Esperado       |
      | Nome do Aluno    | Marcos da Silva      |
      | Nome do Curso    | <curso>              |
      | Carga Horária    | <cargaHoraria>       |
      | Data de Conclusão| <dataConclusao>      |

    Exemplos:
      | curso                    | cargaHoraria | dataConclusao |
      | Desenvolvimento React    | 40 horas     | 12/05/2025    |
      | Automação de Testes QA   | 60 horas     | 18/06/2026    |
