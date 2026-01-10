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
            <main className='min-h-screen mt-40'>
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