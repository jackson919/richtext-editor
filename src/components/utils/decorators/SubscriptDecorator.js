import React from 'react';

export const Subscript = (props) => {
    return (
        <span>
            <sub>
                {props.children}
            </sub>
        </span>
    );
};
