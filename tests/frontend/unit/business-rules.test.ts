import { describe, expect, it } from "vitest";
import { Finalidade, TipoTransacao } from "@/types/domain";

/**
 * Regra de negócio espelhada do domínio/back-end para validação no front-end.
 * O schema Zod atual não cobre essa regra — estes testes documentam a lacuna.
 */
function categoriaPermiteTipo(finalidade: Finalidade, tipo: TipoTransacao): boolean {
  switch (finalidade) {
    case Finalidade.Despesa:
      return tipo === TipoTransacao.Despesa;
    case Finalidade.Receita:
      return tipo === TipoTransacao.Receita;
    case Finalidade.Ambas:
      return true;
    default:
      return false;
  }
}

function menorPodeRegistrarReceita(idade: number): boolean {
  return idade >= 18;
}

describe("Regras de negócio (front-end)", () => {
  it("categoria de despesa não deve aceitar receita", () => {
    expect(categoriaPermiteTipo(Finalidade.Despesa, TipoTransacao.Receita)).toBe(false);
  });

  it("categoria ambas deve aceitar receita e despesa", () => {
    expect(categoriaPermiteTipo(Finalidade.Ambas, TipoTransacao.Receita)).toBe(true);
    expect(categoriaPermiteTipo(Finalidade.Ambas, TipoTransacao.Despesa)).toBe(true);
  });

  it("menor de idade não deve registrar receita", () => {
    expect(menorPodeRegistrarReceita(17)).toBe(false);
    expect(menorPodeRegistrarReceita(18)).toBe(true);
  });
});
