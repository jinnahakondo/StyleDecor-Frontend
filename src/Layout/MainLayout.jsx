import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';
import Container from '../Components/Container/Container';

const MainLayout = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <footer>
                <Container>
                    footer
                </Container>
            </footer>
        </div>
    );
};

export default MainLayout;