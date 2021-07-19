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
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Primitives to be used cross-platform.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/primitives/README.md
 */
import { SVG, Path } from '@wordpress/primitives';

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
 * @param  	   {boolean}        props.withSvgWrapper    Whether or not to wrap each set of paths with an SVG component wrapper.
 * @param  	   {Object}     	props.svgProps          Additional SVG component properties to be appended to the wrapper tag.
 * @param  	   {Array}     	    props.paths             List of SVG path strings.
 * @param  	   {Object}    	    props.attributes        Object of HTML attributes used inside the opening tag to control the element’s behaviour.
 * @return 	   {JSX.Element}                         	Corresponding HTML `Path` elements.
 * @example
 *
 * const path = { d: 'M649.97 0L550.03 0 599.91 54.12 649.97 0z', attrs: { opacity: '0.5' } };
 * <GenerateSvgPaths paths={ path } attributes={ { style: { fill: '#BADA55' } } } />
 */
function GenerateSvgPaths( { withSvgWrapper, svgProps, paths, attributes } ) {
	const instanceId = useInstanceId( GenerateSvgPaths );

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
				{ map( paths, ( { d, attrs }, index ) => (
					<Path key={ `${ index }-${ instanceId }` } d={ d } { ...merge( {}, attrs, attributes ) } />
				) ) }
			</Fragment>
		</ConditionalWrap>
	);
}

GenerateSvgPaths.propTypes = {
	/**
	 * Whether or not to wrap each set of paths with an SVG component wrapper.
	 */
	withSvgWrapper: PropTypes.bool,
	/**
	 * Additional SVG component properties to be appended to the wrapper tag.
	 */
	svgProps: PropTypes.object,
	/**
	 * Array of SVG path strings.
	 */
	paths: PropTypes.array.isRequired,
	/**
	 * Object of HTML attributes used inside the opening tag to control the element’s behaviour.
	 */
	attributes: PropTypes.object,
};

GenerateSvgPaths.defaultProps = {
	withSvgWrapper: false,
	svgProps: {},
	paths: [],
	attributes: {},
};

export default GenerateSvgPaths;
