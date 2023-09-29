import service from "./service";

function obter(){

    return new Promise((resolve, reject) => {
        service.get('/clientes')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function adicionar(membro){

    return new Promise((resolve, reject) => {
        service.post('/clientes', membro)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function atualizar(membro){

    return new Promise((resolve, reject) => {
        service.put(`/clientes/${membro.id}`, membro)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function excluir (id){
    return new Promise((resolve, reject) => {
        service.delete(`/clientes/${id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    obter,
    adicionar,
    atualizar,
    excluir,
}