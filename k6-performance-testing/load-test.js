import http from 'k6/http';
import { check, sleep } from 'k6';

// Configurações do teste de carga (Load Test Configuration)
export const options = {
    // Cenários de simulação de carga de usuários (VUs)
    stages: [
        { duration: '10s', target: 5 },  // Rampa de subida rápida: simula 5 usuários virtuais concorrentes
        { duration: '20s', target: 15 }, // Estágio de carga média: sobe para 15 usuários
        { duration: '15s', target: 20 }, // Pico de carga: atinge 20 usuários
        { duration: '10s', target: 0 },  // Desaceleração: encerra conexões
    ],
    // Critérios de Aceitação / Acordo de Nível de Serviço (SLA Thresholds)
    thresholds: {
        http_req_failed: ['rate<0.01'],  // Menos de 1% de requisições falhas (HTTP 5xx/4xx)
        http_req_duration: ['p(95)<500'], // 95% das requisições devem responder em menos de 500ms
    },
};

const BASE_URL = __ENV.API_BASE_URL || 'http://localhost:5000';

export default function () {
    // Cenário 1: Consultar lista de Transações
    const resTransacoes = http.get(`${BASE_URL}/api/v1.0/Transacoes`);
    check(resTransacoes, {
        'status is 200 (GetAll Transações)': (r) => r.status === 200,
        'has transaction list': (r) => r.json() !== null && Array.isArray(r.json().items),
    });
    sleep(1);

    // Cenário 2: Consultar Totais por Categoria
    const resCategorias = http.get(`${BASE_URL}/api/v1.0/Totais/categorias`);
    check(resCategorias, {
        'status is 200 (Get Totais por Categoria)': (r) => r.status === 200,
        'has category totals': (r) => r.json() !== null && Array.isArray(r.json().items),
    });
    sleep(1);

    // Cenário 3: Consultar Totais por Pessoa
    const resPessoas = http.get(`${BASE_URL}/api/v1.0/Totais/pessoas`);
    check(resPessoas, {
        'status is 200 (Get Totais por Pessoa)': (r) => r.status === 200,
        'has people totals': (r) => r.json() !== null && Array.isArray(r.json().items),
    });
    sleep(2); // Simula o tempo de leitura do usuário
}
