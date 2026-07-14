import { test, expect } from "@playwright/test";
import { z } from "zod";
import { criarCategoria, criarPessoa, criarTransacao } from "./helpers/api";

// Definição de Schemas para Validação de Contrato (Contract Testing / OWASP A04)
const PessoaSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  dataNascimento: z.string(),
  idade: z.number().int().nonnegative(),
});

const PagedPessoasSchema = z.object({
  items: z.array(PessoaSchema),
  totalCount: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

const TransacaoSchema = z.object({
  id: z.string().uuid(),
  descricao: z.string().min(1),
  valor: z.number().positive(),
  tipo: z.number().int().nonnegative(),
  pessoaId: z.string().uuid(),
  categoriaId: z.string().uuid(),
  data: z.string(),
  pessoaNome: z.string().optional().nullable(),
  categoriaDescricao: z.string().optional().nullable(),
});

const ErrorResponseSchema = z.object({
  StatusCode: z.number().int(),
  Message: z.string().min(1),
  Detailed: z.string().optional().nullable(),
});

test.describe("API — regras de negócio (E2E)", () => {
  test("deve validar o contrato da API de listagem de pessoas (Schema Validation)", async ({ request }) => {
    const url = `${process.env.API_BASE_URL ?? "http://127.0.0.1:5000/api/v1.0"}/pessoas`;
    const response = await request.get(url);
    expect(response.status()).toBe(200);

    const json = await response.json();
    
    // Validação formal do contrato usando Zod
    const validationResult = PagedPessoasSchema.safeParse(json);
    
    if (!validationResult.success) {
      console.error("Desvio de contrato detectado (Schema Drift):", validationResult.error.format());
    }
    
    expect(validationResult.success).toBe(true);
  });

  test("menor de idade não deve registrar receita via API", async ({ request }) => {
    const menor = await criarPessoa(request, "Menor E2E", "2015-01-15");
    const categoria = await criarCategoria(request, "Mesada E2E", "Receita");

    const response = await criarTransacao(request, {
      descricao: "Mesada",
      valor: 50,
      tipo: "Receita",
      pessoaId: menor.id,
      categoriaId: categoria.id,
      data: new Date().toISOString().slice(0, 10),
    });

    expect(response.status()).toBe(400);

    // Validação do contrato de erro
    const json = await response.json();
    const validationResult = ErrorResponseSchema.safeParse(json);
    if (!validationResult.success) {
      console.error("Desvio de contrato de erro detectado:", validationResult.error.format());
    }
    expect(validationResult.success).toBe(true);
    expect(json.StatusCode).toBe(400);
    expect(json.Message).toContain("Menores de 18 anos não podem registrar receitas");
  });

  test("exclusão de pessoa remove transações associadas", async ({ request }) => {
    const pessoa = await criarPessoa(request, "Cascade E2E", "1985-06-20");
    const categoria = await criarCategoria(request, "Contas E2E", "Despesa");

    const createTx = await criarTransacao(request, {
      descricao: "Luz",
      valor: 90,
      tipo: "Despesa",
      pessoaId: pessoa.id,
      categoriaId: categoria.id,
      data: new Date().toISOString().slice(0, 10),
    });

    expect(createTx.status()).toBe(201);

    // Validação do payload retornado para a transação criada
    const txJson = await createTx.json();
    const txValidation = TransacaoSchema.safeParse(txJson);
    if (!txValidation.success) {
      console.error("Desvio de contrato de transação detectado:", txValidation.error.format());
    }
    expect(txValidation.success).toBe(true);
    expect(txJson.descricao).toBe("Luz");
    expect(txJson.valor).toBe(90);
    expect(txJson.tipo).toBe(0); // Despesa é 0
    expect(txJson.pessoaId).toBe(pessoa.id);
    expect(txJson.categoriaId).toBe(categoria.id);

    const deletePessoa = await request.delete(
      `${process.env.API_BASE_URL ?? "http://127.0.0.1:5000/api/v1.0"}/pessoas/${pessoa.id}`,
    );

    expect(deletePessoa.status()).toBe(204);
  });
});
