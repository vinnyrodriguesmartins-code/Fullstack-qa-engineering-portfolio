using MinhasFinancas.Application.DTOs;
using MinhasFinancas.Application.Services;
using MinhasFinancas.Domain.Entities;
using MinhasFinancas.Domain.Interfaces;
using NSubstitute;
using Xunit;

namespace MinhasFinancas.UnitTests.Application;

public class TransacaoServiceTests
{
    private readonly IUnitOfWork _unitOfWork = Substitute.For<IUnitOfWork>();
    private readonly ITransacaoRepository _transacaoRepository = Substitute.For<ITransacaoRepository>();
    private readonly IPessoaRepository _pessoaRepository = Substitute.For<IPessoaRepository>();
    private readonly ICategoriaRepository _categoriaRepository = Substitute.For<ICategoriaRepository>();
    private readonly TransacaoService _sut;

    public TransacaoServiceTests()
    {
        _unitOfWork.Transacoes.Returns(_transacaoRepository);
        _unitOfWork.Pessoas.Returns(_pessoaRepository);
        _unitOfWork.Categorias.Returns(_categoriaRepository);
        _sut = new TransacaoService(_unitOfWork);
    }

    [Fact]
    public async Task CreateAsync_DeveRejeitarReceita_ParaMenorDeIdade()
    {
        var pessoaId = Guid.NewGuid();
        var categoriaId = Guid.NewGuid();

        _pessoaRepository.GetByIdAsync(pessoaId).Returns(new Pessoa
        {
            Id = pessoaId,
            Nome = "Menor",
            DataNascimento = DateTime.Today.AddYears(-10)
        });

        _categoriaRepository.GetByIdAsync(categoriaId).Returns(new Categoria
        {
            Id = categoriaId,
            Descricao = "Salário",
            Finalidade = Categoria.EFinalidade.Receita
        });

        var dto = new CreateTransacaoDto
        {
            Descricao = "Mesada indevida",
            Valor = 100,
            Tipo = Transacao.ETipo.Receita,
            PessoaId = pessoaId,
            CategoriaId = categoriaId,
            Data = DateTime.Today
        };

        await Assert.ThrowsAsync<InvalidOperationException>(() => _sut.CreateAsync(dto));
        await _transacaoRepository.DidNotReceive().AddAsync(Arg.Any<Transacao>());
    }

    [Fact]
    public async Task CreateAsync_DeveRejeitarDespesa_EmCategoriaDeReceita()
    {
        var pessoaId = Guid.NewGuid();
        var categoriaId = Guid.NewGuid();

        _pessoaRepository.GetByIdAsync(pessoaId).Returns(new Pessoa
        {
            Id = pessoaId,
            Nome = "Adulto",
            DataNascimento = DateTime.Today.AddYears(-30)
        });

        _categoriaRepository.GetByIdAsync(categoriaId).Returns(new Categoria
        {
            Id = categoriaId,
            Descricao = "Salário",
            Finalidade = Categoria.EFinalidade.Receita
        });

        var dto = new CreateTransacaoDto
        {
            Descricao = "Despesa inválida",
            Valor = 50,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = pessoaId,
            CategoriaId = categoriaId,
            Data = DateTime.Today
        };

        await Assert.ThrowsAsync<InvalidOperationException>(() => _sut.CreateAsync(dto));
        await _transacaoRepository.DidNotReceive().AddAsync(Arg.Any<Transacao>());
    }

    [Fact]
    public async Task CreateAsync_DevePermitirDespesa_ParaMenorDeIdade()
    {
        var pessoaId = Guid.NewGuid();
        var categoriaId = Guid.NewGuid();

        _pessoaRepository.GetByIdAsync(pessoaId).Returns(new Pessoa
        {
            Id = pessoaId,
            Nome = "Menor",
            DataNascimento = DateTime.Today.AddYears(-10)
        });

        _categoriaRepository.GetByIdAsync(categoriaId).Returns(new Categoria
        {
            Id = categoriaId,
            Descricao = "Lazer",
            Finalidade = Categoria.EFinalidade.Despesa
        });

        var dto = new CreateTransacaoDto
        {
            Descricao = "Cinema",
            Valor = 30,
            Tipo = Transacao.ETipo.Despesa,
            PessoaId = pessoaId,
            CategoriaId = categoriaId,
            Data = DateTime.Today
        };

        var resultado = await _sut.CreateAsync(dto);

        Assert.Equal(Transacao.ETipo.Despesa, resultado.Tipo);
        await _transacaoRepository.Received(1).AddAsync(Arg.Any<Transacao>());
        await _unitOfWork.Received(1).SaveChangesAsync();
    }
}
