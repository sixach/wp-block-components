/* eslint-disable @wordpress/no-unsafe-wp-apis, import/named */

/**
 * Utility for libraries from the `Lodash`.
 */
import { isEmpty, map, mapValues, nth, uniq, values } from 'lodash';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { pullMode } from '@sixa/wp-block-utils';

/**
 * Helper React hooks specific for Sixa projects.
 */
import { useToggle } from '@sixa/wp-react-hooks';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button, FlexBlock, FlexItem, __experimentalText as Text, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useCallback, useMemo } from '@wordpress/element';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-icons/
 */
import { link, linkOff } from '@wordpress/icons';

/**
 * Removes all falsy values from arrays and objects.
 *
 * @see    https://github.com/nunofgs/clean-deep
 */
import cleanDeep from 'clean-deep';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { ComponentWrapper, Header, HeaderControlWrapper, InputsWrapper, UnitControlWrapper } from './style';

/**
 * Helper constants.
 */
import Constants from './constants';

/**
 * BorderRadiusControl component let users set values for Top, Right, Bottom, and Left of an element's outer border edge.
 * Users can set a single radius to make circular corners, or two radii to make elliptical corners.
 *
 * @function
 * @since 	   1.14.0
 * @param  	   {Object}         props               Component properties.
 * @param      {boolean}        props.allowReset    Whether a button should be shown to reset the already stored value.
 * @param      {string}         props.label         Label shown before the spinner.
 * @param      {Function}       props.onChange      Function that receives the value of the controls.
 * @param      {Array}          props.units         Collection of available units.
 * @param      {Object}         props.value         Value of the controls.
 * @return 	   {JSX.Element}                        UI controls to render.
 * @example
 *
 * <BorderRadiusControl
 *		label={ __( 'Border Radius' ) }
 *		value={ backgroundSize }
 *		onChange={ ( value ) => setAttributes( { radius: value } ) }
 *      value={ radius }
 *	/>
 *
 * // => Object { topLeft: "33px", topRight: "33px", bottomLeft: "33px", bottomRight: "33px" }
 */
function BorderRadiusControl( { allowReset, label, onChange, units, value } ) {
	const componentId = 'sixa-component-border-radius-control';
	const instanceId = useInstanceId( BorderRadiusControl, componentId );
	const { arrayValues, haveValues, inputValues } = useMemo(
		() => ( {
			arrayValues: values( value ),
			haveValues: isEmpty( cleanDeep( value ) ),
			inputValues: value || Constants.DEFAULT_VALUES,
		} ),
		[ value ]
	);
	const [ isLinked, setIsLinked ] = useToggle( 1 === uniq( arrayValues ).length );
	const handleOnChangeLinkedValues = useCallback(
		( newValue ) => {
			onChange( mapValues( inputValues, () => newValue ) );
		},
		[ inputValues ]
	);
	const handleOnToggleLinked = () => {
		if ( ! isLinked ) {
			handleOnChangeLinkedValues( pullMode( cleanDeep( arrayValues ) ) );
		}

		setIsLinked();
	};

	return (
		<ComponentWrapper id={ instanceId }>
			<Header className={ `${ componentId }__header` }>
				<FlexItem>
					<Text className={ `${ componentId }__label` } id={ `${ instanceId }-heading` }>
						{ label }
					</Text>
				</FlexItem>
				{ allowReset && (
					<FlexItem>
						<Button
							className={ `${ componentId }__reset-button` }
							disabled={ Boolean( haveValues ) }
							isSecondary
							isSmall
							onClick={ () => onChange( Constants.DEFAULT_VALUES ) }
						>
							{ __( 'Reset', 'sixa' ) }
						</Button>
					</FlexItem>
				) }
			</Header>
			<HeaderControlWrapper>
				{ isLinked && (
					<FlexBlock>
						<UnitControlWrapper>
							<UnitControl dragDirection="e" min={ 0 } onChange={ handleOnChangeLinkedValues } units={ units } value={ nth( arrayValues ) } />
						</UnitControlWrapper>
					</FlexBlock>
				) }
				<FlexItem>
					<span>
						<Button
							icon={ isLinked ? link : linkOff }
							iconSize={ 16 }
							isPrimary={ Boolean( isLinked ) }
							isSecondary={ ! Boolean( isLinked ) }
							isSmall
							label={ isLinked ? __( 'Unlink edges', 'sixa' ) : __( 'Link edges', 'sixa' ) }
							onClick={ handleOnToggleLinked }
							showTooltip
						/>
					</span>
				</FlexItem>
			</HeaderControlWrapper>
			{ ! isLinked && (
				<InputsWrapper justify="center">
					{ map( inputValues, ( edgeValue, edgeSelector ) => (
						<UnitControlWrapper>
							<UnitControl
								dragDirection="e"
								min={ 0 }
								onChange={ ( next ) => onChange( { ...value, [ edgeSelector ]: next } ) }
								units={ units }
								value={ edgeValue }
							/>
						</UnitControlWrapper>
					) ) }
				</InputsWrapper>
			) }
		</ComponentWrapper>
	);
}

BorderRadiusControl.propTypes = {
	/**
	 * Whether or not a button should be shown to reset the already stored value.
	 */
	allowReset: PropTypes.bool,
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label: PropTypes.string,
	/**
	 * A function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Collection of available units.
	 */
	units: PropTypes.arrayOf(
		PropTypes.shape( {
			a11yLabel: PropTypes.string,
			default: PropTypes.number,
			label: PropTypes.string,
			step: PropTypes.number,
			value: PropTypes.string,
		} )
	),
	/**
	 * Value of the control.
	 */
	value: PropTypes.shape( {
		topLeft: PropTypes.string,
		topRight: PropTypes.string,
		bottomRight: PropTypes.string,
		bottomLeft: PropTypes.string,
	} ),
};

BorderRadiusControl.defaultProps = {
	allowReset: true,
	label: __( 'Radius', 'sixa' ),
	onChange: () => {},
	units: Constants.ALL_UNITS,
	value: Constants.DEFAULT_VALUES,
};

export default BorderRadiusControl;
