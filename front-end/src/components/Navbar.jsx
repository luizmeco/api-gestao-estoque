import React from "react";
import './navbar.css'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-primary mh-100 text-center slide-down">
            <div className="container-fluid w-75">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={"/registros"}>Registros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={"/movimentacoes"}>Movimentacoes</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar