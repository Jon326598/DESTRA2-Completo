export default class Cliente{
    constructor(obj) {
        obj = obj || {};

        this.id = obj.id;
        this.nome = obj.nome;
        this.sexo = obj.sexo;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.dataNasc = obj.dataNasc;
        // this.dataCadastro = obj.dataCadastro;
    }    
}