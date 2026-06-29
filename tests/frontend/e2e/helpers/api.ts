import type { APIRequestContext } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:5000/api/v1.0";

export async function criarPessoa(
  request: APIRequestContext,
  nome: string,
  dataNascimento: string,
) {
  const response = await request.post(`${apiBaseUrl}/pessoas`, {
    data: { nome, dataNascimento },
  });
  if (!response.ok()) {
    throw new Error(`Falha ao criar pessoa: ${response.status()} ${await response.text()}`);
  }
  return response.json() as Promise<{ id: string; nome: string; idade: number }>;
}

export async function criarCategoria(
  request: APIRequestContext,
  descricao: string,
  finalidade: "Despesa" | "Receita" | "Ambas",
) {
  const response = await request.post(`${apiBaseUrl}/categorias`, {
    data: {
      descricao,
      finalidade: finalidade === "Ambas" ? 2 : finalidade === "Receita" ? 1 : 0,
    },
  });
  if (!response.ok()) {
    throw new Error(`Falha ao criar categoria: ${response.status()} ${await response.text()}`);
  }
  return response.json() as Promise<{ id: string }>;
}

export async function criarTransacao(
  request: APIRequestContext,
  payload: {
    descricao: string;
    valor: number;
    tipo: "Despesa" | "Receita";
    pessoaId: string;
    categoriaId: string;
    data: string;
  },
) {
  return request.post(`${apiBaseUrl}/transacoes`, {
    data: {
      ...payload,
      tipo: payload.tipo === "Receita" ? 1 : 0,
      data: `${payload.data}T00:00:00`,
    },
  });
}
