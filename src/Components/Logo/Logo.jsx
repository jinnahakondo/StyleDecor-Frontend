import { ShieldCheck } from 'lucide-react';
import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-2  px-2 pt-2">
            <div className="p-1.5 bg-primary rounded-lg">
                <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-base-content italic">Style<span className="text-primary">Decor</span></span>
        </div>
    );
};

export default Logo;