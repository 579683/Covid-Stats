import React from 'react';
import "./App.css";
import {Link} from "react-router-dom";

function Nav() {
    return <nav>
               <Link style={{color: "white", textDecoration: "none"}} to="/">
                    <div style= {{ fontSize: "30px"}}>🇳🇴 Covid stats</div>
               </Link>
                <ul className="nav-links">
                <Link style={{color: "white", textDecoration: "none", marginTop: "10px", marginRight: "50px"}} to="graph">
                    <li>🌎 Covid graph</li>
                </Link>
                <Link style={{color: "white", textDecoration: "none", marginTop: "10px"}} to="/about">
                    <li>🌎</li>
                </Link>
                </ul>
            </nav>
}

export default Nav;