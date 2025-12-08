import React from 'react';
import Reviews from '../Reviews/Reviews';

const Tab = ({ service }) => {
    return (
        <div>
            {/* name of each tab group should be unique */}
            <div className="tabs tabs-border ">
                <input type="radio" name="my_tabs_2" className="tab" aria-label="description" />
                <div className="tab-content border-t-base-300 bg-base-100 p-10">{service?.description}</div>

                <input type="radio" name="my_tabs_2" className="tab" aria-label="reivews" defaultChecked />
                <div className="tab-content border-t-base-300 bg-base-100 p-10"><Reviews reviews={service?.reviews} /></div>
            </div>
        </div>
    );
};

export default Tab;