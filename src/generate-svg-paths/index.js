/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map, merge } from 'lodash';

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
 * @since 	   1.0.0
 * @param  	   {Object}    	 props                    	The props that were defined by the caller of this component.
 * @param  	   {Array}     	 props.paths              	List of SVG path strings.
 * @param  	   {Object}    	 props.attributes         	Object of HTML attributes used inside the opening tag to control the element’s behaviour.
 * @return 	   {JSX.Element}                        	Corresponding HTML `Path` elements.
 * @example
 *
 * const path = { d: 'M649.97 0L550.03 0 599.91 54.12 649.97 0z', attrs: { opacity: '0.5' } };
 * <GenerateSvgPaths path={ path } attributes={ { style: { fill: '#BADA55' } } } />
 */
function GenerateSvgPaths( { paths, attributes } ) {
	return (
		<Fragment>
			{ map( paths, ( { d, attrs }, index ) => (
				<Path key={ `path-${ index }` } d={ d } { ...merge( {}, attrs, attributes ) } />
			) ) }
		</Fragment>
	);
}

export default GenerateSvgPaths;
