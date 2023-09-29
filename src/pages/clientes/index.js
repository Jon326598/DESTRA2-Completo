
// import './index.css';
import clienteService from "../../service/cliente-service"
// HOOKs
import { useEffect, useState } from 'react';
import Cliente from '../../models/cliente';
import Swal from 'sweetalert2'

// let modalCliente = new bootstrap.Modal(document.getElementById("modal-cliente"), {});

function ClientePage() {

  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoedicao] = useState(false);
  const [cliente, setCliente] = useState(new Cliente());


  useEffect(() => {

    clienteService.obter()
      .then(response => {
        setClientes(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoedicao(true);
    // eslint-disable-next-line eqeqeq
    let clienteEncontrado = clientes.find(c => c.id == e.target.id);
    clienteEncontrado.dataCadastro = clienteEncontrado.dataCadastro.substring(0, 10);

    setCliente(clienteEncontrado);
  }

  const excluir = (e) => {

    debugger
    // eslint-disable-next-line eqeqeq
    let clienteEncontrado = clientes.find(c => c.id == e.target.id);

    Swal.fire({
       
      text: 'Deseja realmente excluir o membro ' + clienteEncontrado.nome + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
  })
      .then((result) => {
          if (result.isConfirmed) {
              excluirClienteBackend(clienteEncontrado.id);
              Swal.fire({
                  icon: 'success',
                  title: 'Membro excluído com sucesso !',
                  showConfirmButton: false,
                  timer: 2500
              })
          }
      })

    // eslint-disable-next-line no-restricted-globals
    // if (confirm("Deseja realmente excluir o cliente " + clienteEncontrado.nome + " ?")) {
    //   excluirClienteBackend(clienteEncontrado.id)
    // }
  }

  const adicionar = () => {
    setModoedicao(false);
  }

  const atualizarClienteNaTabela = (clienteAtualizado, removerCliente = false) => {
    let indice = clientes.findIndex((cliente) => cliente.id === clienteAtualizado.id);

    (removerCliente)
      ? clientes.splice(indice, 1)
      : clientes.splice(indice, 1, cliente)

    setClientes(arr => [...arr]);
  }

  const salvar = () => {
    if (!cliente.cpfOuCnpj || !cliente.email) {
      Swal.fire({
        icon: 'error',
        text: 'E-mail e CPF são obrigatórios!'
      });
      return;
    }

    (modoEdicao) ? atualizarClienteBackend(cliente) : adicionarClienteBackend(cliente);
  };

  const adicionarClienteBackend = (cliente) => {
    clienteService.adicionar(cliente)
      .then(response => {
        setClientes(lista => [...lista, new Cliente(response.data)])
        limparCliente();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Membro adicionado com sucesso',
          showConfirmButton: false,
          timer: 2500
        })
      })
      .catch(erro => {

      })
  }

  const atualizarClienteBackend = (cliente) => {

    clienteService.atualizar(cliente)
      .then(response => {

        atualizarClienteNaTabela(response.data);

        limparCliente();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Membro atualizado com sucesso',
          showConfirmButton: false,
          timer: 2500
        })
      })
      .catch(erro => {

      })
  }

  const excluirClienteBackend = (id) => {
    clienteService.excluir(id)
      .then(() => {
        // eslint-disable-next-line eqeqeq
        let clienteEncontrado = clientes.find(c => c.id == id);

        atualizarClienteNaTabela(clienteEncontrado, true);

      })
      .catch()
  }

  const limparCliente = () => {
    setCliente({
      ...cliente,
      id: '',
      nome: '',
      sexo: '',
      cpfOuCnpj: '',
      email: '',
      dataNasc: '',
      telefone: '',
      // dataCadastro: '',
    });
  }

  return (
    <div className="container">

      {/* <!-- Titulo --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
          <h4>Clientes</h4>
          <hr />
        </div>
      </div>

      {/* <!-- Botão adicionar --> */}
      <div className="row">
        <div className="col-sm-3">
          <button
            id="btn-adicionar"
            className="btn btn-outline-primary btn-sm espacar-ed"
            data-bs-toggle="modal"
            data-bs-target="#modal-cliente"
            onClick={adicionar}
            data-bs-dismiss="modal"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* <!-- Tabela --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Sexo</th>
                <th>Telefone</th>                
                <th>E-mail</th>
                <th>CPF</th>
                <th>Data Nasc.</th>
                
                {/* <th>Cadastro</th> */}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>

              {clientes.map(cliente => (
                <tr>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.sexo}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cpfOuCnpj}</td>
                  <td>{cliente.dataNasc}</td>

                  {/* <td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td> */}
                  <td>
                    <button
                      id={cliente.id}
                      onClick={editar}
                      class="btn btn-outline-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-cliente"
                      data-bs-dismiss="modal"
                    >
                      Editar
                    </button>
                    <button
                      id={cliente.id}
                      onClick={excluir}
                      class="btn btn-outline-primary btn-sm espacar">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div className="row">
        {/* <!-- The Modal --> */}
        <div className="modal fade modal-lg" id="modal-cliente">
          <div className="modal-dialog">
            <div className="modal-content">

              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">{modoEdicao ? "Editar cliente" : "Adicionar cliente"}</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">

                <div className="row">
                  <div className="col-sm-2">
                    <label for="id" className="form-label">Id</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      id="id"
                      value={cliente.id}
                      onChange={(e) => setCliente({ ...cliente, id: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-10">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" value={cliente.nome}
                      onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <label for="sexo" className="form-label">Sexo</label>
                    <select className="form-select" id="sexo" value={cliente.sexo}
                      onChange={(e) => setCliente({ ...cliente, sexo: e.target.value })}
                      >
                        <option> </option>
                      <option>Masculino</option>
                      <option>Feminino</option>
                    </select>
                  </div>
                
                  <div className="col-sm-6">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="text" className="form-control" id="email" value={cliente.email}
                      onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                    />
                  </div>
                  <div className="col-sm-3">
                    <label for="telefone" className="form-label">Telefone</label>
                    <input type="text" className="form-control" id="telefone" value={cliente.telefone}
                      onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label for="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" value={cliente.cpfOuCnpj}
                      onChange={(e) => setCliente({ ...cliente, cpfOuCnpj: e.target.value })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label for="dataNasc" className="form-label">Data Nasc.</label>
                    <input type="text" className="form-control" id="dataNasc" value={cliente.dataNasc}
                      onChange={(e) => setCliente({ ...cliente, dataNasc: e.target.value })}
                    />
                  </div>
                  {/* <div className="col-sm-4">
                    <label for="dataCadastro" className="form-label">Data de cadastro</label>
                    <input type="date" disabled className="form-control" id="dataCadastro" value={cliente.dataCadastro}
                      onChange={(e) => setCliente({ ...cliente, dataCadastro: e.target.value })}
                    />
                  </div> */}
                </div>

              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button id="btn-salvar" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={salvar}>Salvar</button>
                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal" onClick={limparCliente}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientePage;