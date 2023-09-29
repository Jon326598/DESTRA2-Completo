export default class Membro{
    constructor(obj) {
        obj = obj || {};

        this.id = obj.id;
        this.nome = obj.nome;
        this.sexo = obj.sexo;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.email = obj.email;
        this.dataNasc = obj.dataNasc;
        this.telefone = obj.telefone;
    }    
}