import { CompositeDecorator, Entity } from 'draft-js';
import { Link } from './CreateLink';
import { Superscript } from './Superscript';
import { Subscript } from './Subscript';

/**
 * To use draft-js's CompositeDecorator, we leverage the usage of strategy functions.
 * When a given ContentBlock's contents are evaluated to match a defined strategy,
 * they will be rendered using a specific React component.
 *
 * https://facebook.github.io/draft-js/docs/advanced-topics-decorators.html#content
 */
export const createDecorators = (decoratorObjectsArray) => {
    return new CompositeDecorator(decoratorObjectsArray);
};

const findLinkEntities = (contentBlock, callback) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
            return (
                entityKey !== null && Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
};

const subscriptStrategy = (contentBlock, callback) => {
    contentBlock.findStyleRanges((character) => {
        return character.hasStyle('SUBSCRIPT');
    },
    callback
    );
};

const superscriptStrategy = (contentBlock, callback) => {
    contentBlock.findStyleRanges((character) => {
        console.log(character)
        return character.hasStyle('SUPERSCRIPT');
    },
    callback
    );
};

/**
 * The following object literals follow the CompositeDecorator format.
 * 'strategy' key is a function to be used when searching through ContentBlock.
 * The 'component' key refers to the React component to be used when re-rendering.
 */
export const LinkDecorator = {
    strategy: findLinkEntities,
    component: Link
};

export const SuperscriptDecorator = {
    strategy: superscriptStrategy,
    component: Superscript
};

export const SubscriptDecorator = {
    strategy: subscriptStrategy,
    component: Subscript
};
