/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { omit } from 'lodash';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { createElement } from '@wordpress/element';

/**
 * Component used as equivalent of Fragment with unescaped HTML, in cases where
 * it is desirable to render dangerous HTML without needing a wrapper element.
 * To preserve additional props, a `div` wrapper _will_ be created if any props
 * aside from `children` are passed.
 *
 * @function
 * @since 	   1.0.0
 * @param  	   {Object}      props             		 The props that will be passed through to the wrapper element.
 * @param  	   {string}      props.tagName           The tag name of the wrapper element.
 * @param  	   {string}      props.children          Children should be a string of HTML.
 * @return 	   {JSX.Element}                   		 Dangerously-rendering component.
 */
function InnerHTML( { tagName = 'div', children, ...props } ) {
	// The DIV wrapper will be stripped by serializer, unless there are
	// non-children props present.
	return createElement( tagName, {
		dangerouslySetInnerHTML: { __html: children },
		...omit( props, 'tagName' ),
	} );
}

export default InnerHTML;
