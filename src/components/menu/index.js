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
                <li><Link to='/membros'>Membros</Link></li>
                <li><Link onClick={logout}>Sair</Link></li>
            </ul>
        )
    }else {
        return null;
    }
}

export default Menu;