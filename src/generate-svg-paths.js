/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map, merge } from 'lodash';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/blob/trunk/packages/compose/README.md
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { Fragment } from '@wordpress/element';

/**
 * Primitives to be used cross-platform.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/blob/trunk/packages/primitives/README.md
 */
import { Path } from '@wordpress/primitives';

/**
 * Generates corresponding HTML `Path` elements and enables the shape to be drawn.
 *
 * @function
 * @since 	 1.0.0
 * @param  	 {Object}    props                    The props that were defined by the caller of this component.
 * @param  	 {Array}     props.paths              List of SVG path strings.
 * @param  	 {Object}    props.attributes         Object of HTML attributes used inside the opening tag to control the element’s behaviour.
 * @return 	 {WPElement}                          Corresponding HTML `Path` elements.
 * @example
 *
 * const path = { d: 'M649.97 0L550.03 0 599.91 54.12 649.97 0z', attrs: { opacity: '0.5' } };
 * <GenerateSvgPaths path={ path } attributes={ { style: { fill: '#BADA55' } } } />
 */
function GenerateSvgPaths( { paths, attributes } ) {
	const instanceId = useInstanceId( GenerateSvgPaths );

	return (
		<Fragment>
			{ map( paths, ( { d, attrs }, index ) => (
				<Path key={ `path-${ index }-${ instanceId }` } d={ d } { ...merge( {}, attrs, attributes ) } />
			) ) }
		</Fragment>
	);
}

export default GenerateSvgPaths;
