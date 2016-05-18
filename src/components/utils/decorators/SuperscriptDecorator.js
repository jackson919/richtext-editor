import React from 'react';
import { Entity } from 'draft-js';
import StyleButton from '../StyleButton';

export const Superscript = (props) => {
    return (
        <span>
            <sup>
                {props.children}
            </sup>
        </span>
    );
};
