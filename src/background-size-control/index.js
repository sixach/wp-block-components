/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * Utility for libraries from the `Lodash`.
 */
import { get, isEqual, map, parseInt, assign, isNaN, isEmpty } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ButtonGroup, Button, BaseControl, Flex, FlexItem, FlexBlock, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { ComponentWrapper, ControlWrapper } from './style';

/**
 * Possible background position values.
 */
import sizesTable from './sizes';

const UNITCONTROL_MIN = 0;
const UNITCONTROL_MAX = 100;
const UNITCONTROL_UNIT = [ { value: '%', label: '%' } ];

/**
 * UI controls that are designed to provide ability to adjust CSS background size properties.
 * There are four different syntaxes you can choose from with this control: the keyword syntax ("auto", "cover", "contain" and "custom").
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.0
 * @param  	   {Object}         props                        The props that were defined by the caller of this component.
 * @param      {boolean}        props.allowReset             Whether a button should be shown to reset the already stored value.
 * @param      {string}         props.className              The CSS class name(s) that will be added to the wrapper element.
 * @param      {string}         props.help                   Optional help text for the control.
 * @param      {boolean}        props.hideLabelFromVision    Whether to accessibly hide the label.
 * @param      {string}         props.label                  Label shown before the spinner.
 * @param      {Function}       props.onChange               Handle changes.
 * @param      {Array}          props.sizes                  Optionally override background position options.
 * @param      {Object}         props.value                  Value of the control.
 * @return 	   {JSX.Element}                               	 UI controls.
 * @example
 *
 * <BackgroundSizeControl
 *		label={ __( 'Background Size' ) }
 *		value={ backgroundSize }
 *		onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
 *	/>
 *
 * // => Object { selection: "custom", width: "15%", height: "12%" }
 */
function BackgroundSizeControl( { allowReset, className, help, hideLabelFromVision, label, onChange, sizes, value } ) {
	const instanceId = useInstanceId( BackgroundSizeControl );
	const selection = get( value, 'selection' );
	const valueX = get( value, 'width' );
	const valueY = get( value, 'height' );
	const isCustom = ( other = selection ) => isEqual( 'custom', other );
	const handleOnClick = ( slug ) => {
		handleOnChange( { selection: slug }, isCustom( slug ) ? { width: 'auto', height: 'auto' } : {} );
	};
	const handleOnChange = ( source, destination = value ) => {
		onChange( assign( {}, destination, source ) );
	};
	const getParsedCoordinate = ( position, fallback = '' ) => {
		const noUnitsValue = parseInt( position );
		return isNaN( noUnitsValue ) ? fallback : `${ noUnitsValue }%`;
	};

	return (
		<BaseControl
			className={ classnames( 'sixa-component-background-size', className ) }
			help={ help }
			hideLabelFromVision={ hideLabelFromVision }
			id={ `sixa-component-background-size-${ instanceId }` }
			label={ label }
		>
			<ComponentWrapper>
				<Flex justify="space-between">
					<FlexBlock>
						<ButtonGroup>
							{ map( sizes, ( { name, slug } ) => (
								<Button isPrimary={ isEqual( slug, selection ) } isSmall key={ slug } onClick={ () => handleOnClick( slug ) } value={ slug }>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
					</FlexBlock>
					<FlexItem>
						{ allowReset && (
							<Button disabled={ isEmpty( value ) } isDestructive isSmall onClick={ () => onChange( {} ) }>
								{ __( 'Reset' ) }
							</Button>
						) }
					</FlexItem>
				</Flex>
			</ComponentWrapper>
			{ isCustom() && (
				<ControlWrapper>
					<UnitControl
						dragDirection="e"
						label={ __( 'Width' ) }
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						onChange={ ( next ) => handleOnChange( { width: getParsedCoordinate( next, 'auto' ) } ) }
						unit="%"
						units={ UNITCONTROL_UNIT }
						value={ getParsedCoordinate( valueX ) }
					/>
					<UnitControl
						dragDirection="s"
						label={ __( 'Height' ) }
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						onChange={ ( next ) => handleOnChange( { height: getParsedCoordinate( next, 'auto' ) } ) }
						unit="%"
						units={ UNITCONTROL_UNIT }
						value={ getParsedCoordinate( valueY ) }
					/>
				</ControlWrapper>
			) }
		</BaseControl>
	);
}

// allowReset, className, help, hideLabelFromVision, label, onChange, sizes, value

BackgroundSizeControl.propTypes = {
	/**
	 * Whether or not a button should be shown to reset the already stored value.
	 */
	allowReset: PropTypes.bool,
	/**
	 * A help text will be generated using help property as the content.
	 */
	className: PropTypes.string,
	/**
	 * If this property is added, a help text will be generated using help property as the content.
	 */
	help: PropTypes.string,
	/**
	 * If true, the label will only be visible to screen readers.
	 */
	hideLabelFromVision: PropTypes.bool,
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label: PropTypes.string,
	/**
	 * A function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Possible background position values.
	 */
	sizes: PropTypes.array,
	/**
	 * Value of the control.
	 */
	value: PropTypes.object.isRequired,
};

BackgroundSizeControl.defaultProps = {
	allowReset: true,
	className: undefined,
	help: undefined,
	hideLabelFromVision: false,
	label: undefined,
	onChange: () => {},
	sizes: sizesTable,
	value: {},
};

export default BackgroundSizeControl;
