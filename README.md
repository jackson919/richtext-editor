# react-rich-text-editor

## Overview
The goal of this project is to provide a package that brings back the familiarity of traditional word processors and robust modern-day web applications that enable "WYSIWYG" (what you see is what you get) text editing. Underneath the hood, this
package relies on Facebook's `draft-js` library, which makes working with the ContentEditable API much less painful.

This rich text editor (RTE) is designed with simplicity of implementation in mind, aimed at users who aren't looking to customize or extend every feature possible from the base `draft-js` library. If you're looking for a React-friendly RTE that has a simple API and simple configuration, this package will prove to be a great choice.

### API
The `RichTextEditor` component has three main props:
  1. `value`
    > The parent or wrapper component of `RichTextEditor` may provide a default value to be rendered into the editor.
    This prop accepts either an EditorState object (see `draft-js`) or raw markup. The raw markup must be a string, and has limitations -
    it cannot render *any* HTML provided, but can safely create its state if the HTML provided is identical to the available HTML output.

  2. `onValueChange`
    > Provide a change handler to access the editor's standard output - which is Draft's immutable EditorState object. This is shown
    in the example app.

  3. `returnHTML`
    > Providing a handler here will enable you to access the ContentState transformed into raw markup. This can be useful if your app can only
    save "editor state" as HTML output.

#### Roadmap
* It'd be great to maintain highlight/focus on the selected text even as user is selecting a block style (H1, H2, etc)
or applying a link decoration.
  * Improving add-link behavior:
    1. Allowing 'return' key to add link
    2. Upon hover of applied link within editor, potentially allow a popover to allow user edit
    3. While cursor is anywhere within the link entity, clicking the 'Link' button should populate
    the input field with the currently applied link, also allowing user to remove it from there.
* Easily allow user to revert to a default style instead of sticking with the previously selected block style.
* Enable reasonable user configuration for general styles and selection of tools - without too much overhead
* Evaluate properly converting this into a NPM package as well as enabling Flow

#### Small Issues
* Within the editor, applying a link to other styled text like `superscript` will cause it to lose its
`superscript` or `subscript` decoration. However, the raw markup and rendered HTML show up as expected.
* After highlighting text, if user clicks the 'Link' button, the focus shifts to the text input, removing
the highlighting of text until after link has been successfully added.
