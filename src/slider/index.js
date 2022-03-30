/**
 * Utility for libraries from the `Lodash`.
 */
import merge from 'lodash/merge';

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
 * Import Swiper React components
 *
 * @see    https://swiperjs.com/react
 */
import { Swiper } from 'swiper/react/swiper-react';

/**
 * Import Swiper modules
 *
 * @see    https://swiperjs.com/swiper-api#modules
 */
import { Navigation, Pagination, Autoplay, A11y, FreeMode } from 'swiper';

/**
 * Shared Swiper options.
 */
import defaultOptions from './options';

// Import Swiper core and modules styles
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';

/**
 * A react wrapper for the react-glider package.
 * A fast, dependency free, native scrolling list with paging controls.
 *
 * @function
 * @since      1.3.0
 * @param	   {Object}		  	props              The props that were defined by the caller of this component.
 * @param      {string}         props.className    The CSS class name(s) that will be added to the wrapper element.
 * @param  	   {JSX.Element}    props.children     Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param      {string}         props.gap    	   The gap CSS property sets the gaps (gutters) between rows and columns.
 * @param  	   {Object} 		ref      		   Component enhancer used to enable passing a ref to its wrapped component.
 * @return	   {JSX.Element}    				   Slider component.
 * @example
 *
 * <Swiper modules={[Navigation, Pagination, A11y]} navigation pagination>
 *     <SwiperSlide><img src="https://picsum.photos/700/300" /></SwiperSlide>
 *     <SwiperSlide><img src="https://picsum.photos/700/300" /></SwiperSlide>
 *     <SwiperSlide><img src="https://picsum.photos/700/300" /></SwiperSlide>
 *     <SwiperSlide><img src="https://picsum.photos/700/300" /></SwiperSlide>
 * </Swiper>
 */
function Slider( { className, children, gap, ...wrapperProps }, ref ) {
	return (
		<div className={ classnames( 'sixa-component-slider', 'swiper-wrap', className ) }>
			<Swiper
				modules={[Autoplay, Navigation, Pagination, A11y, FreeMode]}
				{ ...merge( {}, defaultOptions, wrapperProps ) }
			>
				{ children }
			</Swiper>
		</div>
	);
}

Slider.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * React elements that are being passed as children.
	 */
	children: PropTypes.arrayOf( PropTypes.element ).isRequired,
};

Slider.defaultProps = {
	className: undefined,
	children: undefined,
};

export default forwardRef( Slider );
