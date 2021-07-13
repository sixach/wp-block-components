/**
 * Utility for libraries from the `Lodash`.
 */
import { merge } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { forwardRef } from '@wordpress/element';

/**
 * A react wrapper for glider.js
 *
 * @see    https://github.com/hipstersmoothie/react-glider
 */
import Glider from 'react-glider';

/**
 * Shared Glider options.
 */
import defaultOptions from './options';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { Track } from './style';

/**
 * A react wrapper for the react-glider package.
 * A fast, dependency free, native scrolling list with paging controls.
 *
 * @function
 * @since      1.3.0
 * @param	   {Object}		  	props              The props that were defined by the caller of this component.
 * @param      {string}         props.className    The CSS class name(s) that will be added to the wrapper element.
 * @param      {string}         props.gap    	   The gap CSS property sets the gaps (gutters) between rows and columns.
 * @param  	   {JSX.Element}    props.children     Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {Object} 		ref      		   Component enhancer used to enable passing a ref to its wrapped component.
 * @return	   {JSX.Element}    				   Slider component.
 * @example
 *
 * <Slider hasArrows hasDots>
 *     <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 *	   <img src="https://picsum.photos/700/300" />
 * </Slider>
 */
function Slider( { className, gap = '0', children = [], ...wrapperProps }, ref ) {
	return (
		<div className={ classnames( 'sixa-component-slider', 'glider-wrap', className ) }>
			<Glider ref={ ref } { ...merge( {}, defaultOptions, wrapperProps ) } skipTrack>
				<Track className="glider-track" gap={ gap }>
					{ children }
				</Track>
			</Glider>
		</div>
	);
}

Slider.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * Extra spacing value between rows and columns of each slide.
	 */
	gap: PropTypes.string,
	/**
	 * React elements that are being passed as children.
	 */
	children: PropTypes.arrayOf( PropTypes.element ).isRequired,
};

Slider.defaultProps = {
	className: null,
	gap: '0',
	children: [],
};

export default forwardRef( Slider );
