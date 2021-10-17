/**
 * Utility for libraries from the `Lodash`.
 */
import { forEach, get, map, nth, set } from 'lodash';

/**
 * Sixa icon library.
 */
import { widescreen, laptop, tablet, mobile } from '@sixa/icon-library';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { BlockControls } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ToolbarGroup } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useCallback, useMemo } from '@wordpress/element';

/**
 * EventManager for JavaScript.
 * Hooks are used to manage component state and lifecycle.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 */
import GenerateSvgPaths from '../generate-svg-paths';

/**
 * Helper constants.
 */
import Constants from './constants';

/**
 * VisibilityToolbar is a React component that renders a toolbar of viewport icon buttons.
 *
 * @function
 * @since	   1.8.1
 * @param 	   {Object}  	    props             Component properties.
 * @param 	   {Function}  	    props.onChange    Function that receives the value of the visibility control.
 * @param 	   {Object}  	    props.value       An object with state of visibility defined across different viewports.
 * @return     {JSX.Element}                      Visibility toolbar component to render.
 * @example
 *
 * <VisibilityToolbar
 * 	   onChange={ ( value ) => setAttributes( { ...value } ) }
 *	   shouldRender={ isEditing }
 *     value={ { widescreen: false, laptop: false, tablet: false, mobile: false } }
 * />
 */
function VisibilityToolbar( { onChange, value } ) {
	const activeColors = applyFilters( 'sixa.visibilityToolbarActiveIconColors', Constants.ACTIVE_COLORS );
	const colors = applyFilters( 'sixa.visibilityToolbarIconColors', Constants.COLORS );
	const viewports = useMemo( () => ( { widescreen, laptop, tablet, mobile } ), [] );
	const paintPaths = useCallback(
		( paths, palette ) =>
			forEach( paths, ( { attrs }, index ) => {
				set( attrs, 'fill', nth( palette, index ) );
			} ),
		[]
	);

	return (
		<BlockControls group="other">
			<ToolbarGroup
				controls={ map( value, ( state, viewport ) => {
					const isActive = Boolean( state );
					const colorPalette = isActive ? activeColors : colors;
					const paths = get( viewports, `${ viewport }.paths` );
					paintPaths( paths, colorPalette );
					return {
						icon: <GenerateSvgPaths paths={ paths } withSvgWrapper />,
						isActive,
						onClick: () => onChange( { visible: { ...value, [ viewport ]: ! state } } ),
						/* translators: %s: Device name. */
						title: sprintf( __( 'Hide on %s?', 'sixa' ), viewport ),
					};
				} ) }
			/>
		</BlockControls>
	);
}

VisibilityToolbar.propTypes = {
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.shape( {
		widescreen: PropTypes.bool,
		laptop: PropTypes.bool,
		tablet: PropTypes.bool,
		mobile: PropTypes.bool,
	} ),
};

VisibilityToolbar.defaultProps = {
	onChange: () => {},
	shouldRender: true,
	value: { widescreen: false, laptop: false, tablet: false, mobile: false },
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( VisibilityToolbar );
