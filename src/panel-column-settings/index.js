/* eslint-disable @wordpress/no-unsafe-wp-apis, import/named */

/**
 * Utility for libraries from the `Lodash`.
 */
import { assign, has } from 'lodash';

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
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

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
import { useCallback } from '@wordpress/element';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 */
import PanelViewports from '../panel-viewports';

/**
 * PanelColumnSettings is a React component that enables the
 * content editor to adjust layout columns across different viewports.
 *
 * @function
 * @since	   1.12.0
 * @param 	   {Object}  	    props              	  Component properties.
 * @param 	   {Object}  	    props.columnsProps    Component properties for the "PanelViewports" component.
 * @param 	   {Object}  	    props.gapProps    	  Component properties for the "UnitControl" component.
 * @param 	   {string}  	    props.label    	  	  Title of the "PanelBody". This shows even when it is closed.
 * @param 	   {Function}  	    props.onChange     	  Function that receives the value of the control.
 * @param 	   {Object}  	    props.value        	  An object with state of values defined across different viewports.
 * @return     {JSX.Element}                       	  Viewports toolbar component to render.
 * @example
 *
 * <PanelColumnSettings
 *     onChange={ ( value ) => setAttributes( { ...value } ) }
 *     shouldRender={ maxLimit > 1 }
 *     value={ columns: { widescreen: 4, laptop: 4, tablet: 2, mobile: 1 }, gap: '0px' }
 *	/>
 */
function PanelColumnSettings( { columnsProps, gapProps, label, onChange, value, ...otherProps } ) {
	const handleOnChange = useCallback( ( source, destination = value ) => {
		onChange( assign( {}, destination, source ) );
	} );

	return (
		<PanelBody initialOpen={ false } title={ label } { ...otherProps }>
			<PanelViewports
				Component={ RangeControl }
				label={ __( 'Columns', 'sixa' ) }
				onChange={ ( newValue ) => handleOnChange( { columns: newValue } ) }
				shouldRender
				value={ value?.columns }
				{ ...gapProps }
			/>
			{ has( value, 'gap' ) && (
				<UnitControl
					label={ __( 'Gaps (gutters)', 'sixa' ) }
					isPressEnterToChange={ false }
					isResetValueOnUnitChange={ false }
					onChange={ ( newValue ) => handleOnChange( { gap: newValue } ) }
					value={ value?.gap }
					{ ...columnsProps }
				/>
			) }
		</PanelBody>
	);
}

PanelColumnSettings.propTypes = {
	/**
	 * Additional properties added to the "PanelViewports" component.
	 */
	columnsProps: PropTypes.shape( {
		max: PropTypes.number,
		min: PropTypes.number,
		step: PropTypes.number,
	} ),
	/**
	 * Additional properties added to the "UnitControl" component.
	 */
	gapProps: PropTypes.shape( {
		max: PropTypes.number,
		min: PropTypes.number,
		step: PropTypes.number,
	} ),
	label: PropTypes.string,
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.shape( {
		columns: PropTypes.shape( {
			widescreen: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
			laptop: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
			tablet: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
			mobile: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string, PropTypes.number ] ),
		} ),
		gap: PropTypes.string,
	} ),
};

PanelColumnSettings.defaultProps = {
	columnsProps: {
		max: 100,
		min: 0,
		step: 1,
	},
	gapProps: {
		max: 6,
		min: 1,
		step: 1,
	},
	label: __( 'Column Settings', 'sixa' ),
	onChange: () => {},
	shouldRender: true,
	value: { columns: { widescreen: false, laptop: false, tablet: false, mobile: false }, gap: '0px' },
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( PanelColumnSettings );
