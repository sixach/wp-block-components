/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * Utility for libraries from the `Lodash`.
 */
import { get, isEqual, map, parseInt, assign, noop, isNaN, isEmpty } from 'lodash';

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
 * @param      {string}         props.label                  Label shown before the spinner.
 * @param      {boolean}        props.hideLabelFromVision    Whether to accessibly hide the label.
 * @param      {string}         props.help                   Optional help text for the control.
 * @param      {string}         props.className              The CSS class name(s) that will be added to the wrapper element.
 * @param      {boolean}        props.allowReset             Whether a button should be shown to reset the already stored value.
 * @param      {Array}          props.sizes                  Optionally override background position options.
 * @param      {Object}         props.value                  Value of the control.
 * @param      {Function}       props.onChange               Handle changes.
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
function BackgroundSizeControl( { label, hideLabelFromVision, help, className, allowReset, sizes, value, onChange } ) {
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
			id={ `sixa-component-background-size-${ instanceId }` }
			label={ label }
			help={ help }
			hideLabelFromVision={ hideLabelFromVision }
			className={ classnames( 'sixa-component-background-size', className ) }
		>
			<ComponentWrapper>
				<Flex justify="space-between">
					<FlexBlock>
						<ButtonGroup>
							{ map( sizes, ( { name, slug } ) => (
								<Button key={ slug } isSmall value={ slug } isPrimary={ isEqual( slug, selection ) } onClick={ () => handleOnClick( slug ) }>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
					</FlexBlock>
					<FlexItem>
						{ allowReset && (
							<Button isSmall isDestructive disabled={ isEmpty( value ) } onClick={ () => onChange( {} ) }>
								{ __( 'Reset' ) }
							</Button>
						) }
					</FlexItem>
				</Flex>
			</ComponentWrapper>
			{ isCustom() && (
				<ControlWrapper>
					<UnitControl
						unit="%"
						label={ __( 'Width' ) }
						value={ getParsedCoordinate( valueX ) }
						onChange={ ( next ) => handleOnChange( { width: getParsedCoordinate( next, 'auto' ) } ) }
						dragDirection="e"
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						units={ UNITCONTROL_UNIT }
					/>
					<UnitControl
						unit="%"
						label={ __( 'Height' ) }
						value={ getParsedCoordinate( valueY ) }
						onChange={ ( next ) => handleOnChange( { height: getParsedCoordinate( next, 'auto' ) } ) }
						dragDirection="s"
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						units={ UNITCONTROL_UNIT }
					/>
				</ControlWrapper>
			) }
		</BaseControl>
	);
}

BackgroundSizeControl.propTypes = {
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label: PropTypes.string,
	/**
	 * If true, the label will only be visible to screen readers.
	 */
	hideLabelFromVision: PropTypes.bool,
	/**
	 * If this property is added, a help text will be generated using help property as the content.
	 */
	help: PropTypes.string,
	/**
	 * A help text will be generated using help property as the content.
	 */
	className: PropTypes.string,
	/**
	 * Whether or not a button should be shown to reset the already stored value.
	 */
	allowReset: PropTypes.bool,
	/**
	 * Possible background position values.
	 */
	sizes: PropTypes.array.isRequired,
	/**
	 * Value of the control.
	 */
	value: PropTypes.object.isRequired,
	/**
	 * A function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
};

BackgroundSizeControl.defaultProps = {
	label: null,
	hideLabelFromVision: false,
	help: null,
	className: null,
	allowReset: true,
	sizes: sizesTable,
	value: {},
	onChange: undefined,
};

export default BackgroundSizeControl;
