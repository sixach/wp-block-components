/**
 * Utility for libraries from the `Lodash`.
 */
import { get, map } from 'lodash';

/**
 * Sixa icon library.
 */
import { widescreen, laptop, tablet, mobile } from '@sixa/icon-library';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { TabPanel } from '@wordpress/components';

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
import { useMemo } from '@wordpress/element';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 */
import GenerateSvgPaths from '../generate-svg-paths';

/**
 * PanelViewports is a React component that organizes an
 * instance of given component across different viewports.
 *
 * @function
 * @since	   2.0.0
 * @param 	   {Object}  	    props              Component properties.
 * @param 	   {Function}  	    props.Component    Reference to the desired React component.
 * @param 	   {Function}  	    props.onChange     Function that receives the value of the control.
 * @param 	   {Object}  	    props.value        An object with state of values defined across different viewports.
 * @return     {JSX.Element}                       Viewports toolbar component to render.
 * @example
 *
 * <PanelViewports
 *     Component={ RangeControl }
 *     label={ __( 'Number of columns', 'sixa' ) }
 *     max={ 6 }
 *     min={ 1 }
 *     onChange={ ( value ) => setAttributes( { columns: value } ) }
 *     shouldRender={ maxLimit > 1 }
 *     value={ { widescreen: 4, laptop: 4, tablet: 2, mobile: 1 } }
 *	/>
 */
function PanelViewports( { Component, onChange, value, ...otherProps } ) {
	const viewports = useMemo( () => ( { widescreen, laptop, tablet, mobile } ), [] );

	return (
		<TabPanel
			tabs={ map( value, ( state, viewport ) => {
				const paths = get( viewports, `${ viewport }.paths` );
				return { name: viewport, title: <GenerateSvgPaths paths={ paths } withSvgWrapper /> };
			} ) }
		>
			{ ( { name } ) => (
				<Component onChange={ ( newValue ) => onChange( { ...value, [ name ]: newValue } ) } value={ get( value, name ) } { ...otherProps } />
			) }
		</TabPanel>
	);
}

PanelViewports.propTypes = {
	/**
	 * Reference to a React element. i.e. RangeControl.
	 */
	Component: PropTypes.elementType.isRequired,
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.shape( {
		widescreen: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
		laptop: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
		tablet: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
		mobile: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
	} ),
};

PanelViewports.defaultProps = {
	Component: undefined,
	onChange: () => {},
	shouldRender: true,
	value: { widescreen: false, laptop: false, tablet: false, mobile: false },
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( PanelViewports );
