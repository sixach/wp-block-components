/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map, merge } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @ignore
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { forwardRef } from '@wordpress/element';

/**
 * A react wrapper for glider.js
 *
 * @ignore
 * @see    https://github.com/hipstersmoothie/react-glider
 */
import Glider from 'react-glider';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @ignore
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Shared Glider options.
 *
 * @ignore
 */
import defaultOptions from './options';

/**
 * A react wrapper for the react-glider package.
 * A fast, dependency free, native scrolling list with paging controls.
 *
 * @function
 * @since    1.3.0
 * @param	 {Object}		  props              The props that were defined by the caller of this component.
 * @param    {string}         props.className    The CSS class name(s) that will be added to the wrapper element.
 * @param  	 {JSX.Element}    props.children     Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	 {Object} 		  ref      			 Component enhancer used to enable passing a ref to its wrapped component.
 * @return	 {JSX.Element}        				 Slider component.
 * @example
 *
 * <Slider hasArrows hasDots>
 *     <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 * </Slider>
 */
function Slider( { className, children, ...wrapperProps }, ref ) {
	const instanceId = useInstanceId( Slider );

	return (
		<div className={ classnames( 'sixa-component-slider', 'glider-wrap', className ) }>
			<Glider ref={ ref } { ...merge( {}, defaultOptions, wrapperProps ) }>
				{ map( children, ( item, index ) => (
					<div key={ `${ index }-${ instanceId }` } className="glider-slide">
						{ item }
					</div>
				) ) }
			</Glider>
		</div>
	);
}

Slider.propTypes = {
	className: PropTypes.string,
	children: PropTypes.element.isRequired,
};

export default forwardRef( Slider );
