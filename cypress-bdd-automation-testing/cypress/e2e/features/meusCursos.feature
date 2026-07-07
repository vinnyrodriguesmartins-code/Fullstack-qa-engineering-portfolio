# language: pt

Funcionalidade: Meus Cursos - Drawer

  Cenário: Caso 1 - Exibição da lista completa de cursos no drawer
    Dado que o usuário acessa aba "Aprender" e possui mais de 4 cursos cadastrados
    Quando clica em “Ver todos” na seção de cursos
    Então o drawer lateral deve ser exibido com a lista completa de cursos

  Cenário: Caso 2 - Aplicar filtro "<nomeFiltro>" na lista de cursos do drawer
    Dado que o drawer com a lista de cursos está aberto
    Quando o usuário clica no filtro "<nomeFiltro>"
    Então a lista deve exibir apenas os cursos que correspondem ao filtro "<nomeFiltro>" selecionado

    Exemplos:
      | nomeFiltro    |
      | Todos         |
      | Destacados    |
      | Em andamento  |
      | Trial         |
      | Não iniciado  |
      | Concluídos    |

  Cenário: Caso 3 - Buscar cursos por "<texto>" no drawer
    Dado que o drawer com a lista de cursos está aberto
    Quando o usuário clica na lupa e digita "<texto>" relacionado ao nome, modalidade ou tag de um curso
    Então a lista deve ser atualizada com os cursos correspondentes

    Exemplos:
      | texto              |
      | curso livre        |
      | bonus              |
      | Extensivo R1 2025  |

  Cenário: Caso 4 - Validar busca sem resultados no drawer
    Dado que o drawer com a lista de cursos está aberto
    Quando o usuário clica na lupa e digita "teste"
    Então deve ser exibida a mensagem de que nenhum resultado foi encontrado

  Cenário: Caso 5 - Validar ação de despriorizar ou destacar curso no drawer
    Dado que o drawer com a lista de cursos está aberto
    Quando o usuário clica no botão "Despriorizar" ou "Destacar"
    Então o curso deve ser substituído automaticamente pelo primeiro da lista de "Outros cursos" ou "Em Destaque"