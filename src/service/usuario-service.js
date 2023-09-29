import service from "./service";

function autenticar(email, senha){
    return new Promise((resolve, reject) => {
        service.post('/login', {email, senha})
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}


function salvarToken(token){
    localStorage.setItem('token', token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterToken(){
    return localStorage.getItem("token");  //retorna o valor do item "token"
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}";   //retorna o valor do item "usuario", se não existir, ret
}

function sairSistema(){
    localStorage.removeItem("token");//remove o item "token", limpando a sessão
    localStorage.removeItem("usuario");
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin(){
    window.open('/login', '_self');
}

function usuarioEstaLogado(){
    let token = obterToken();

    return !!token;
}

// eslint-disable-next-line no-unused-vars
function validarUsuarioAutenticado(){

    let logado = usuarioEstaLogado();

    // Só vai entrar aqui se eu estiver na tela login
    // eslint-disable-next-line eqeqeq
    if(window.location.pathname == "/login"){
        
        if(logado){
            window.open("/", '_self')
        }
    // eslint-disable-next-line eqeqeq
    } else if(!logado && window.location.pathname != "/login"){
        direcionarTelaDeLogin();
    }

}


// validarUsuarioAutenticado();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    autenticar,
    salvarToken,
    salvarUsuario,
    sairSistema,
    obterToken,
    obterUsuario
}