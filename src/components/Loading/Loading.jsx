import CircleLoader from 'react-spinners/CircleLoader';
import React from 'react';
import './loading.scss';

export const Loading = () => {
    return (
        <div className="loading">
            <CircleLoader
                size={150}
                color={"#D1B042"}
            />
        </div>
    );
}