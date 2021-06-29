/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, isEqual, map, parseInt, merge } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see     https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @ignore
 * @see 	https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { Fragment } from '@wordpress/element';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ButtonGroup, Button, BaseControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * The styled components generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { ComponentWrapper, ControlWrapper } from './style';

/**
 * Possible background position values.
 *
 * @ignore
 */
import sizesTable from './sizes';

const UNITCONTROL_MIN = 0;
const UNITCONTROL_MAX = 100;

/**
 * UI controls that are designed to provide ability to adjust CSS background size properties.
 * There are four different syntaxes you can choose from with this control: the keyword syntax ("auto", "cover", "contain" and "custom").
 *
 * @function
 * @since 	   1.2.0
 * @param  	   {Object}      props                           	The props that were defined by the caller of this component.
 * @param      {string}      props.id                        	The id of the element to which labels and help text are being generated.
 * @param      {string}      props.label                     	Label shown before the spinner.
 * @param      {boolean}     props.hideLabelFromVision       	Whether to accessibly hide the label.
 * @param      {string}      props.help                      	Optional help text for the control.
 * @param      {string}      props.className                 	The class that will be added with “components-background-size” to the classes of the wrapper div.
 * @param      {Array}       props.sizes                     	Optionally override background position options.
 * @param      {Object}      props.value                     	Value of the control.
 * @param      {Function}    props.onChange                  	Handle changes.
 * @return 	   {JSX.Element}                               		UI controls.
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
function BackgroundSizeControl( { id, label, hideLabelFromVision, help, className, sizes = sizesTable, value, onChange } ) {
	const selection = get( value, 'selection' );
	const valueX = get( value, 'width' );
	const valueY = get( value, 'height' );
	const handleOnChange = ( source ) => onChange( merge( {}, value, source ) );

	return (
		<BaseControl
			id={ id }
			label={ label }
			help={ help }
			hideLabelFromVision={ hideLabelFromVision }
			className={ classnames( 'components-background-size', className ) }
		>
			<ComponentWrapper>
				<ButtonGroup>
					{ map( sizes, ( { name, slug } ) => (
						<Fragment>
							<Button isSmall value={ slug } isPrimary={ isEqual( slug, selection ) } onClick={ () => handleOnChange( { selection: slug } ) }>
								{ name }
							</Button>
						</Fragment>
					) ) }
				</ButtonGroup>
			</ComponentWrapper>
			{ isEqual( 'custom', selection ) && (
				<ControlWrapper>
					<UnitControl
						label={ __( 'Width' ) }
						value={ parseInt( valueX ) }
						onChange={ ( next ) => handleOnChange( { width: `${ parseInt( next ) }%` } ) }
						dragDirection="e"
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						unit="%"
						units={ [ { value: '%', label: '%' } ] }
					/>
					<UnitControl
						label={ __( 'Height' ) }
						value={ parseInt( valueY ) }
						onChange={ ( next ) => handleOnChange( { height: `${ parseInt( next ) }%` } ) }
						dragDirection="s"
						labelPosition="side"
						max={ UNITCONTROL_MAX }
						min={ UNITCONTROL_MIN }
						unit="%"
						units={ [ { value: '%', label: '%' } ] }
					/>
				</ControlWrapper>
			) }
		</BaseControl>
	);
}

BackgroundSizeControl.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	hideLabelFromVision: PropTypes.bool,
	help: PropTypes.string,
	className: PropTypes.string,
	sizes: PropTypes.array.isRequired,
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default BackgroundSizeControl;
