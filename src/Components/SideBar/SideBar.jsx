import React from 'react';


const SideBar = ({ links }) => {
    return (
        <aside class="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-default">
                <ul class="space-y-2 font-medium">
                    {links}
                </ul>
            </div>
        </aside>

    );
};

export default SideBar;