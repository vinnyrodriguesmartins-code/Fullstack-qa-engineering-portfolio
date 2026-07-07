import { describe, it, expect } from "vitest";
import { transacaoSchema } from "@/lib/schemas";
import { TipoTransacao } from "@/types/domain";

describe("BUG-004 Evidence: transacaoSchema validations", () => {
    it("deve falhar ao validar transação de receita para menor (Atualmente PASSANDO - BUG)", () => {
        // Nota: O schema atual NÃO tem acesso à idade da pessoa, 
        // validando apenas se pessoaId é string. Isso comprova o BUG-004.
        const invalidData = {
            descricao: "Receita indevida",
            valor: 100,
            tipo: TipoTransacao.Receita,
            categoriaId: "cat-1",
            pessoaId: "p-menor-1", // Supondo que esta pessoa seja menor
            data: new Date()
        };

        const result = transacaoSchema.safeParse(invalidData);

        // Se o bug existir, o parse será bem sucedido (sucesso = true)
        // O teste passa se o bug for confirmado.
        expect(result.success).toBe(true);
    });
});
