import { describe, expect, it } from "vitest";
import { pessoaSchema, categoriaSchema, transacaoSchema } from "@/lib/schemas";
import { Finalidade, TipoTransacao } from "@/types/domain";

describe("pessoaSchema", () => {
  it("aceita dados válidos", () => {
    const result = pessoaSchema.safeParse({
      nome: "Maria",
      dataNascimento: new Date("1990-05-10"),
    });

    expect(result.success).toBe(true);
  });

  it("rejeita nome vazio", () => {
    const result = pessoaSchema.safeParse({
      nome: "",
      dataNascimento: new Date("1990-05-10"),
    });

    expect(result.success).toBe(false);
  });
});

describe("categoriaSchema", () => {
  it("aceita finalidade válida", () => {
    const result = categoriaSchema.safeParse({
      descricao: "Alimentação",
      finalidade: Finalidade.Despesa,
    });

    expect(result.success).toBe(true);
  });
});

describe("transacaoSchema", () => {
  it("aceita transação válida", () => {
    const result = transacaoSchema.safeParse({
      descricao: "Mercado",
      valor: 120.5,
      tipo: TipoTransacao.Despesa,
      categoriaId: "cat-1",
      pessoaId: "pessoa-1",
      data: new Date(),
    });

    expect(result.success).toBe(true);
  });

  it("rejeita valor zero ou negativo", () => {
    const result = transacaoSchema.safeParse({
      descricao: "Mercado",
      valor: 0,
      tipo: TipoTransacao.Despesa,
      categoriaId: "cat-1",
      pessoaId: "pessoa-1",
      data: new Date(),
    });

    expect(result.success).toBe(false);
  });
});
