import React from 'react';
import "./App.css";
import {Link} from "react-router-dom";

function Nav() {
    return <nav>
               <Link style={{color: "white", textDecoration: "none"}} to="/">
                    <div style= {{ fontSize: "30px"}}>🇳🇴 Covid Stats</div>
               </Link>
                <ul className="nav-links">
                <Link style={{color: "white", textDecoration: "none", marginTop: "10px", marginRight: "50px"}} to="graph">
                    <li>🌎 Covid Graph</li>
                </Link>
                <Link style={{color: "white", textDecoration: "none", marginTop: "10px"}} to="/about">
                    <li>🌎 Live Stats</li>
                </Link>
                </ul>
            </nav>
}

export default Nav;