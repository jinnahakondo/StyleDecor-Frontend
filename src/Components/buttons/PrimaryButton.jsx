import React from 'react';
import { Link } from 'react-router';

const PrimaryButton = ({ children, path, style }) => {
    return <Link to={path} className={`btn btn-primary btn-sm lg:btn-md ${style && style}`}>{children}</Link>
};

export default PrimaryButton;