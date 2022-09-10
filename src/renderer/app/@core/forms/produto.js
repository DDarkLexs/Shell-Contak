module.exports = class  {

    produto={
    id_produto:null,
    nome:``,
    unidade:1,
    preco:0,
    iva:1.00,
    taxa:null,
    desconto: 0,
    ativo:true,
    obs:null,
    datacad:null,
    expiracao:null,
    categoria:null,
    }

    compra={
        id_compra:null,
        preco:null,
        qtd:0,
        datacad:null,
        desconto:null,
        id_produto:null,
        id_compra:null,
    }


    notaCompra={
    pago:true,
    datacad:null,
    vencimento:null,
    id_funcionario:null,
    id_fornecedor:null
    }

//     vencimento DATE NOT NULL,
    // pago BOOLEAN NOT NULL,
    // datacad DATETIME NOT NULL,
    // id_funcionario INTEGER NOT NULL,
    // id_empresa INTEGER NOT NULL,

    fornecedor={
        id_fornecedor:null,
        nome:null,
        telefone:null,
        cidade:null,
        endereco:null,
        descricao:null,
        ativo:false,
        datacad:null,
    }
        





}