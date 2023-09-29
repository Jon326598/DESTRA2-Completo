import membroService from '../../service/membro-service';
import { useEffect, useState } from 'react';
import Membro from '../../models/membro';
import Swal from 'sweetalert2'


function MembroPage() {

  const [membros, setMembros] = useState([]);
  const [modoEdicao, setModoedicao] = useState(false);
  const [membro, setMembro] = useState(new Membro());


  useEffect(() => {

    membroService.obter()
      .then(response => {
        setMembros(response.data);
      })
      .catch(erro => {
        console.log(erro);
      });

  }, []);

  const editar = (e) => {
    setModoedicao(true);
    // eslint-disable-next-line eqeqeq
    let membroEncontrado = membros.find(m => m.id == e.target.id);

    setMembro(membroEncontrado);
  }

  const excluir = (e) => {

    debugger
    // eslint-disable-next-line eqeqeq
    let membroEncontrado = membros.find(m => m.id == e.target.id);

    Swal.fire({
       
      text: 'Deseja realmente excluir o membro ' + membroEncontrado.nome + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
  })
      .then((result) => {
          if (result.isConfirmed) {
              excluirMembroBackend(membroEncontrado.id);
              Swal.fire({
                  icon: 'success',
                  title: 'Membro excluído com sucesso !',
                  showConfirmButton: false,
                  timer: 2500
              })
          }
      })

  }

  const adicionar = () => {
    setModoedicao(false);
  }

  const atualizarMembroNaTabela = (membroAtualizado, removerMembro = false) => {
    // eslint-disable-next-line eqeqeq
    let indice = membros.findIndex((membro) => membro.id == membroAtualizado.id);

    (removerMembro)
      ? membros.splice(indice, 1)
      : membros.splice(indice, 1, membro)

    setMembros(arr => [...arr]);
  }

  const salvar = () => {
    if (!membro.cpfOuCnpj || !membro.email) {
      Swal.fire({
        icon: 'error',
        text: 'E-mail e CPF são obrigatórios!'
      });
      return;
    }

    (modoEdicao) ? atualizarMembroBackend(membro) : adicionarMembroBackend(membro);
  };

  const adicionarMembroBackend = (membro) => {
    membroService.adicionar(membro)
      .then(response => {
        setMembros(lista => [...lista, new Membro(response.data)])
        limparMembro();
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

  const atualizarMembroBackend = (membro) => {

    membroService.atualizar(membro)
      .then(response => {

        atualizarMembroNaTabela(response.data);

        limparMembro();

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

  const excluirMembroBackend = (id) => {
    membroService.excluir(id)
      .then(() => {
        // eslint-disable-next-line eqeqeq
        let membroEncontrado = membros.find(m => m.id == id);

        atualizarMembroNaTabela(membroEncontrado, true);

      })
      .catch()
  }

  const limparMembro = () => {
    setMembro({
      ...membro,
      id: '',
      nome: '',
      sexo: '',
      cpfOuCnpj: '',
      email: '',
      dataNasc: '',
      telefone: '',
    });
  }

  return (
    <div className="container">

      {/* <!-- Title --> */}
      <div className="row mt-3">
        <div className="col-sm-12">
          <h4>Membros</h4>
          <hr />
        </div>
      </div>

      {/* <!-- Button adc --> */}
      <div className="row">
        <div className="col-sm-3 " >
          <button
            id="btn-adicionar"
            className="btn btn-outline-primary btn-sm espacar-ad"
            data-bs-toggle="modal"
            data-bs-target="#modal-membro"
            onClick={adicionar}
            data-bs-dismiss="modal"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* <!-- Table --> */}
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>

              {membros.map(membro => (
                <tr>
                  <td>{membro.id}</td>
                  <td>{membro.nome}</td>
                  <td>{membro.sexo}</td>
                  <td>{membro.telefone}</td>
                  <td>{membro.email}</td>
                  <td>{membro.cpfOuCnpj}</td>
                  <td>{membro.dataNasc}</td>

                  <td>
                    <button
                      id={membro.id}
                      onClick={editar}
                      class="btn btn-outline-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-membro"
                      data-bs-dismiss="modal"
                    >
                      Editar
                    </button>
                    <button
                      id={membro.id}
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
        <div className="modal fade modal-lg" id="modal-membro">
          <div className="modal-dialog">
            <div className="modal-content">

              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">{modoEdicao ? "Editar membro" : "Adicionar membro"}</h4>
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
                      id="idMenu"
                      value={membro.id}
                      onChange={(e) => setMembro({ ...membro, id: e.target.value })}
                    />
                  </div>

                  <div className="col-sm-10">
                    <label for="nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="nome" value={membro.nome}
                      onChange={(e) => setMembro({ ...membro, nome: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <label for="sexo" className="form-label">Sexo</label>
                    <select className="form-select" id="sexo" value={membro.sexo}
                      onChange={(e) => setMembro({ ...membro, sexo: e.target.value })}
                      >
                        <option> </option>
                      <option>Masculino</option>
                      <option>Feminino</option>
                    </select>
                  </div>
                
                  <div className="col-sm-5">
                    <label for="email" className="form-label">E-mail</label>
                    <input type="text" className="form-control" id="email" value={membro.email}
                      onChange={(e) => setMembro({ ...membro, email: e.target.value })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label for="telefone" className="form-label">Telefone</label>
                    <input type="text" className="form-control" id="telefone" value={membro.telefone}
                      onChange={(e) => setMembro({ ...membro, telefone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label for="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" value={membro.cpfOuCnpj}
                      onChange={(e) => setMembro({ ...membro, cpfOuCnpj: e.target.value })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label for="dataNasc" className="form-label">Data Nasc.</label>
                    <input type="text" className="form-control" id="dataNasc" value={membro.dataNasc}
                      onChange={(e) => setMembro({ ...membro, dataNasc: e.target.value })}
                    />
                  </div>
                </div>

              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button id="btn-salvar" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={salvar}>Salvar</button>
                <button id="btn-cancelar" className="btn btn-light btn-sm" data-bs-dismiss="modal" onClick={limparMembro}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembroPage;