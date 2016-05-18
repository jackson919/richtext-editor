import React from 'react';
import { Entity } from 'draft-js';
import StyleButton from '../StyleButton';

export const Subscript = (props) => {
    return (
        <span>
            <sub>
                {props.children}
            </sub>
        </span>
    );
}
