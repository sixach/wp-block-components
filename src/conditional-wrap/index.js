/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { cloneElement } from '@wordpress/element';

/**
 * React component for wrapping children based on a condition.
 *
 * @function
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.0
 * @param  	   {Object}      props             		    The props that were defined by the caller of this component.
 * @param  	   {boolean}     props.condition            Whether the component should be wrapped.
 * @param  	   {JSX.Element} props.children             Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {Function}    props.wrap           	    Callback function to clone and return a new React element using element as the starting point.
 * @return 	   {JSX.Element}                   		 	A new React component wrapped with a new element.
 * @example
 *
 * <ConditionalWrap
 *	condition={ !! tooltip }
 *	wrap={ ( children ) => (
 *		<Tooltip position="bottom" title={ tooltip }>
 * 			{ children }
 *		</Tooltip>
 *	) }
 * >
 *     <button>{ children }</button>
 * </ConditionalWrap>
 */
function ConditionalWrap( { condition, children, wrap } ) {
	return condition ? cloneElement( wrap( children ) ) : children;
}

ConditionalWrap.propTypes = {
	condition: PropTypes.bool,
	children: PropTypes.element,
	wrap: PropTypes.func,
};

export default ConditionalWrap;
