/**
 * Utility for libraries from the `Lodash`.
 */
import { map, merge } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { Fragment } from '@wordpress/element';

/**
 * Primitives to be used cross-platform.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/primitives/README.md
 */
import { Path, SVG } from '@wordpress/primitives';

/**
 * React component for wrapping children based on a condition.
 */
import ConditionalWrap from './../conditional-wrap';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.0
 * @param  	   {Object}    	    props                   The props that were defined by the caller of this component.
 * @param  	   {Object}    	    props.attributes        Object of HTML attributes used inside the opening tag to control the element’s behaviour.
 * @param  	   {Array}     	    props.paths             List of SVG path strings.
 * @param  	   {Object}     	props.svgProps          Additional SVG component properties to be appended to the wrapper tag.
 * @param  	   {boolean}        props.withSvgWrapper    Whether or not to wrap each set of paths with an SVG component wrapper.
 * @return 	   {JSX.Element}                         	Corresponding HTML `Path` elements.
 * @example
 *
 * const path = { d: 'M649.97 0L550.03 0 599.91 54.12 649.97 0z', attrs: { opacity: '0.5' } };
 * <GenerateSvgPaths paths={ path } attributes={ { style: { fill: '#BADA55' } } } />
 */
function GenerateSvgPaths( { attributes, paths, svgProps, withSvgWrapper } ) {
	return (
		<ConditionalWrap
			condition={ Boolean( withSvgWrapper ) }
			wrap={ ( children ) => (
				<SVG width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" { ...svgProps }>
					{ children }
				</SVG>
			) }
		>
			<Fragment>
				{ map( paths, ( { d, attrs } ) => (
					<Path d={ d } key={ d } { ...merge( {}, attrs, attributes ) } />
				) ) }
			</Fragment>
		</ConditionalWrap>
	);
}

GenerateSvgPaths.propTypes = {
	/**
	 * Object of HTML attributes used inside the opening tag to control the element’s behaviour.
	 */
	attributes: PropTypes.object,
	/**
	 * Array of SVG path strings.
	 */
	paths: PropTypes.arrayOf(
		PropTypes.shape( {
			d: PropTypes.string,
			attrs: PropTypes.object,
		} )
	),
	/**
	 * Additional SVG component properties to be appended to the wrapper tag.
	 */
	svgProps: PropTypes.object,
	/**
	 * Whether or not to wrap each set of paths with an SVG component wrapper.
	 */
	withSvgWrapper: PropTypes.bool,
};

GenerateSvgPaths.defaultProps = {
	attributes: {},
	paths: [],
	svgProps: {},
	withSvgWrapper: false,
};

export default GenerateSvgPaths;
