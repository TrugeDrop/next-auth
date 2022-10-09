import React from 'react';
import Nav from "./navbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
        
            <main className="container">
                {children}
            </main>
        </div>
    );
};

export default Layout