import './index.css';

function Home() {
    return (
        <div>
            <div className="container">

                {/* <!-- Title --> */}
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <h4>Bem-Vindo</h4>
                        <hr />
                    </div>
                </div>

                {/* <!-- Button adc --> */}
                <div className="row">
                    <div className="col-sm-6 " >
                        <button
                            id="btn-destaques"
                            className="btn btn-outline-primary btn-sm espacar"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-destaques"
                            data-bs-dismiss="modal"
                        >DESTAQUES</button>
                        <button
                            id="btn-msgDoDia"
                            className="btn btn-outline-primary btn-sm espacar"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-msgDoDia"
                            data-bs-dismiss="modal"
                        >MENSAGEM DO DIA</button>
                        <button
                            id="btn-msgDoDia"
                            className="btn btn-outline-primary btn-sm espacar"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-agendaSemanal"
                            data-bs-dismiss="modal"
                        >AGENDA SEMANAL</button>
                    </div>
                </div>

                {/* <!-- Table --> */}
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <table className="table table-bordered table-hover">
                            <thead >
                                <tr>
                                    <th id="tBoasVindas">Visão</th>
                                    <th id="tBoasVindas">Missão</th>
                                    <th id="tBoasVindas">Valores</th>
                                    <th id="tBoasVindas">Propósitos</th>
                                    <th id="tBoasVindas">Cultura</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td id="visao">Ganhar todas as pessoas para Jesus !</td>
                                        <td id="missao">Transformar pessoas comuns em extraordinários discípiulos de Jesus.</td>
                                        <td id="valores">Ume igreja que vive a palavra 
                                        de Deus em amor,
                                        incluindo pessoas na família do céu
                                        & trazendo o sobrenatural para a terra 
                                        em todas as áreas do viver,
                                        de modo contextualizado,
                                        excelente e transparente.</td>
                                        <td id="propositos">Ser uma igreja biblíca dirigida pelos 
                                        propósitos de Jesus: Missão, Adoração,
                                        Comunhão, Discipulado e Serviço.</td>
                                        <td id="cultura">Ser uma igreja-família pastoreada por
                                        uma rede de grupos
                                        sob os princípios dos cinco dons de governo.</td>
                                    </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <!-- Modal --> */}
                <div className="row">
                    {/* <!-- The Modal --> */}
                    <div className="modal fade modal-lg" id="modal-destaques">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label id='idLabel' className="form-label">Destaques</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                    <button id="btn-salvar" 
                                    className="btn btn-primary btn-sm" 
                                    data-bs-dismiss="modal" 
                                    >Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade modal-lg" id="modal-msgDoDia">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label id='idLabel' className="form-label">Mensagem do dia</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                    <button id="btn-salvar" 
                                    className="btn btn-primary btn-sm" 
                                    data-bs-dismiss="modal" 
                                    >Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade modal-lg" id="modal-agendaSemanal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label id='idLabel' className="form-label">Agenda semanal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="id"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="modal-footer">
                                    <button id="btn-salvar" 
                                    className="btn btn-primary btn-sm" 
                                    data-bs-dismiss="modal" 
                                    >Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            


        </div>
    )
}

export default Home;