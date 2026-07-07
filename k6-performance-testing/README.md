# ⚡ TESTES DE PERFORMANCE — GRAFANA k6 ⚡

Este diretório contém os scripts de teste de carga e performance desenvolvidos utilizando o **Grafana k6**, uma ferramenta moderna de testes de carga otimizada para desenvolvedores e engenheiros de DevOps/QA.

---

## 🚀 O que é k6?
O **k6** é um gerador de carga open-source que consome pouca memória e executa cenários descritos em JavaScript moderno (ES6). Ele simula o comportamento de múltiplos usuários concorrentes batendo nos endpoints da API para analisar throughput, tempos de resposta (percentis) e limites de capacidade da aplicação.

---

## 🛠️ Cenários de Carga Implementados

O script [load-test.js](file:///c:/Projetos/Trampo%20teste/k6-performance-testing/load-test.js) simula um comportamento real de usuários concorrentes através de **Stages** (Ramp-up e Ramp-down):
1. **Ramp-up Inicial**: Sobe gradualmente de 0 a 5 usuários virtuais concorrentes (VUs) em 10 segundos.
2. **Carga Média**: Aumenta para 15 VUs em 20 segundos.
3. **Pico de Acesso**: Atinge 20 VUs concorrentes em 15 segundos.
4. **Ramp-down**: Reduz gradualmente para 0 usuários em 10 segundos.

### Endpoints Avaliados:
- `GET /api/v1.0/Transacoes` (Listagem geral)
- `GET /api/v1.0/Totais/categorias` (Totais de gastos por categoria)
- `GET /api/v1.0/Totais/pessoas` (Totais de gastos por pessoa)

### Limiares de Qualidade (SLA Thresholds):
- **Taxa de Erro (`http_req_failed`)**: Deve ser inferior a **1%** das requisições.
- **Percentil 95 (`http_req_duration`)**: 95% das requisições devem retornar em menos de **500ms**.

---

## 🏃 Como Executar Localmente

### 1. Instalar o k6
- **Windows (PowerShell/Winget)**:
  ```powershell
  winget install k6 --source winget
  ```
- **macOS (Homebrew)**:
  ```bash
  brew install k6
  ```
- **Linux (Debian/Ubuntu)**:
  ```bash
  sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD10DEC74398E8
  echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/PowerShell/sources.list.d/k6.list
  sudo apt-get update
  sudo apt-get install k6
  ```

### 2. Rodar o Teste Localmente
Certifique-se de que o backend (.NET) está rodando localmente (seja via Docker ou diretamente com `dotnet run`). 

Com a API ativa na porta padrão (`http://localhost:5000`), execute o seguinte comando a partir da raiz do repositório:
```bash
# Rodar o teste completo de carga definido nos stages
k6 run k6-performance-testing/load-test.js
```

### 3. Rodar Execução de Teste Rápida (Smoke Test)
Para validar se os endpoints estão respondendo corretamente de forma rápida (1 usuário, 1 execução):
```bash
k6 run k6-performance-testing/load-test.js --vus 1 --duration 1s
```
