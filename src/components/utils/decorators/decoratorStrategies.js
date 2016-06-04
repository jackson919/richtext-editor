import { CompositeDecorator, Entity, CharacterMetadata } from 'draft-js';
import { Link, ImplicitLink } from './LinkDecorator';
import { Superscript } from './SuperscriptDecorator';
import { Subscript } from './SubscriptDecorator';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

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

const linkify = linkifyIt();
linkify.tlds(tlds);

const linkifyTextStrategy = (contentBlock, callback) => {
    const links = linkify.match(contentBlock.get('text'));

    // links is a "Match" object provided by linkify.
    if (typeof links !== 'undefined' && links !== null) {
        for (let i = 0; i < links.length; i++) {
            callback(links[i].index, links[i].lastIndex);
        }
    }
};

// const linkifyTextStrategy = (contentBlock, callback) => {
//     const links = linkify.match(contentBlock.get('text'));
//     const list = contentBlock.getCharacterList();
//
//     // links is a "Match" object provided by linkify.
//     if (typeof links !== 'undefined' && links !== null) {
//         for (let i = 0; i < links.length; i++) {
//             const urlValue = links[i].url;
//             const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
//
//             list.forEach((char) => {
//                 CharacterMetadata.applyEntity(char, entityKey);
//             });
//
//             callback(links[i].index, links[i].lastIndex);
//         }
//     }
// };

const findLinkEntities = (contentBlock, callback) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
    }, callback);
};

const subscriptStrategy = (contentBlock, callback) => {
    contentBlock.findStyleRanges((character) => {
        return character.hasStyle('SUBSCRIPT');
    }, callback);
};

const superscriptStrategy = (contentBlock, callback) => {
    contentBlock.findStyleRanges((character) => {
        return character.hasStyle('SUPERSCRIPT');
    }, callback);
};

/**
 * The following object literals follow the CompositeDecorator format.
 * 'strategy' key is a function to be used when searching through ContentBlock.
 * The 'component' key refers to the React component to be used when re-rendering.
 */
export const LinkifyTextDecorator = {
    strategy: linkifyTextStrategy,
    component: ImplicitLink
};

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
