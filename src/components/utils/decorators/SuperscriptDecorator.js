import React from 'react';

export const Superscript = (props) => {
    return (
        <span>
            <sup>
                {props.children}
            </sup>
        </span>
    );
};
