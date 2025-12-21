import React from 'react';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const iconsLink = [
        { icon: <FaFacebook />, link: 'https://facebook.com/RobiulislamJinnah' },
        { icon: <FaTwitter />, link: 'https://x.com' },
        { icon: <FaInstagram />, link: 'https://instagram.com' },
        { icon: <FaLinkedin />, link: 'https://linkedin.com' }
    ]
    return (
        <footer className="bg-base-200 text-base-content border-t border-base-300">
            {/* Top Section: Main Content */}
            <div className="footer p-10 max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Column 1: Brand & Social */}
                <aside>
                    <div className="">
                        <Logo />
                    </div>
                    <p className="mt-2 opacity-80">
                        Professional home and ceremony decoration services. Transforming spaces into experiences.
                    </p>
                    <div className="flex gap-4 mt-5">
                        {
                            iconsLink.map((social, i) => <Link
                                key={i}
                                to={social.link}
                                className="btn btn-sm btn-circle btn-outline btn-primary hover:text-white transition-all duration-300"
                            >
                                {social.icon}
                            </Link>

                            )
                        }

                    </div>
                </aside>

                {/* Column 2: Quick Links */}
                <nav>
                    <h6 className="footer-title opacity-100 font-bold text-secondary">Links</h6>
                    <Link to={'/'} className="link link-hover">Home</Link>
                    <Link to={'/services'} className="link link-hover">Services</Link>
                    <Link to={'/contact'} className="link link-hover">Contact</Link>
                    <Link to={'/about'} className="link link-hover">About us</Link>
                </nav>

                {/* Column 3: Business Hours (Requirement) */}
                <div>
                    <h6 className="footer-title opacity-100 font-bold text-secondary">Working Hours</h6>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between w-48">
                            <span>Sat - Thu:</span>
                            <span className="font-semibold text-primary">9AM - 8PM</span>
                        </div>
                        <div className="flex justify-between w-48">
                            <span>Wednesday:</span>
                            <span className="font-semibold text-primary">10AM - 6PM</span>
                        </div>
                        <div className="flex justify-between w-48">
                            <span>Friday:</span>
                            <span className="badge badge-outline badge-sm">Closed</span>
                        </div>
                    </div>
                </div>

                {/* Column 4: Contact Details (Requirement) */}
                <div>
                    <h6 className="footer-title opacity-100 font-bold text-secondary">Contact Us</h6>
                    <div className="space-y-3">
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-primary" />
                            Dhaka, Bangladesh
                        </p>
                        <p className="flex items-center gap-3">
                            <FaPhoneAlt className="text-primary" />
                            +880 1234 567890
                        </p>
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-primary" />
                            support@styledecor.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className="footer footer-center p-6 border-t border-base-300 bg-base-300 text-base-content">
                <aside>
                    <p className=" font-medium">
                        © {new Date().getFullYear()} <span className="text-primary font-bold">StyleDecor</span>. All rights reserved.
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;