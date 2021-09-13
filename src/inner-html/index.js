/**
 * Utility for libraries from the `Lodash`.
 */
import { omit } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { createElement } from '@wordpress/element';

/**
 * Component used as equivalent of Fragment with unescaped HTML, in cases where
 * it is desirable to render dangerous HTML without needing a wrapper element.
 * To preserve additional props, a `div` wrapper _will_ be created if any props
 * aside from `children` are passed.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.0
 * @param  	   {Object}      	props             The props that will be passed through to the wrapper element.
 * @param  	   {string}      	props.children    Children should be a string of HTML.
 * @param  	   {string}      	props.tagName     The tag name of the wrapper element.
 * @return 	   {JSX.Element}                      Dangerously-rendering component.
 * @example
 *
 * const content = '<span class=\"amount\"><bdi><span class=\"currency-symbol\">&pound;<\/span>11.05<\/bdi><\/span>';
 * <InnerHTML tagName="span">{ content }</InnerHTML>
 */
function InnerHTML( { children, tagName, ...props } ) {
	// The DIV wrapper will be stripped by serializer, unless there are
	// non-children props present.
	return createElement( tagName, {
		dangerouslySetInnerHTML: { __html: children },
		...omit( props, 'tagName' ),
	} );
}

InnerHTML.propTypes = {
	/**
	 * Children should be a string of HTML.
	 */
	children: PropTypes.node,
	/**
	 * The tag name of the wrapper element.
	 */
	tagName: PropTypes.string,
};

InnerHTML.defaultProps = {
	children: undefined,
	tagName: 'div',
};

export default InnerHTML;
