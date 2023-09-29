import './index.css';

import { Link, useLocation } from 'react-router-dom';
import usuarioService from '../../service/usuario-service';

function Menu(){

    const logout = () =>{
        usuarioService.sairSistema();
    };

    if(useLocation().pathname !== '/login'){
        return (
            <ul className='menu'>
                <li id='destra'><Link to= '#'>DESTRA</Link></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/clientes'>Membros</Link></li>
                {/* <li><Link to='/produtos'>Ministérios</Link></li> */}
                <li><Link onClick={logout}>Sair</Link></li>
            </ul>
        )
    }else {
        return null;    //retorna nada para o componente não ser renderizado no DOM
    }
}

export default Menu;