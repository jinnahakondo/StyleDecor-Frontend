import React from 'react';
import Home from '../Pages/Home/Home';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';
import Container from '../Components/Container/Container';
import Footer from '../Components/Social Login/Footer/Footer';

const MainLayout = () => {
    return (
        <div className=''>
            <header>
                <Navbar />
            </header>
            <main className='space-y-20 min-h-screen '>
                <Container>
                    <Outlet />
                </Container>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MainLayout;