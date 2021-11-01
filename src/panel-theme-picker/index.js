/**
 * Utility for libraries from the `Lodash`.
 */
import { map, isEqual } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { isNonEmptyArray } from '@sixa/wp-block-utils';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button, PanelBody, PanelRow, Tooltip, VisuallyHidden } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { Item, Theme, Wrapper } from './style';

/**
 * "PanelThemePicker" is a React component that allows for providing
 * alternative styles to existing blocks. The component renders a UI
 * element that enables the user to select from predefined themes available in the list.
 *
 * @function
 * @since	   2.0.0
 * @param 	   {Object} 		props 			  Component properties.
 * @param 	   {Function} 	    props.onChange    Trigger change event when a theme is selected.
 * @param 	   {Function} 	    props.onReset 	  Empty any stored theme object from the attributes.
 * @param 	   {Array} 		    props.themes      List of theme variations.
 * @param 	   {string} 		props.title       Title of the `PanelBody`.
 * @param 	   {string} 		props.value 	  Selected theme’s id.
 * @return     {JSX.Element}					  SkinPicker component to render.
 * @example
 *
 * <PanelThemePicker
 *     onChange={ handleOnChangeTheme }
 *     onReset={ handleOnResetTheme }
 *     shouldRender={ withApi }
 *     themes={ themes }
 *     title={ __( 'Themes', 'sixa' ) }
 *     value={ theme?.id }
 * />
 */
function PanelThemePicker( { onChange, onReset, themes, title, value } ) {
	return (
		<PanelBody initialOpen title={ title }>
			<Wrapper className="block-editor-block-types-list" justify="flex-start" wrap>
				{ map( themes, ( { id, imageUri, title: name } ) => {
					const isSelected = isEqual( id, value );

					return (
						<Item
							className={ classnames( id, 'block-editor-block-types-list__list-item', {
								'selected-theme': isSelected,
							} ) }
							key={ id }
						>
							<Tooltip position="top" text={ name }>
								<Theme
									className="editor-block-list-item-button"
									imageUri={ imageUri }
									isSelected={ isSelected }
									isPrimary
									onClick={ () => onChange( id ) }
								>
									<VisuallyHidden>{ name }</VisuallyHidden>
								</Theme>
							</Tooltip>
						</Item>
					);
				} ) }
			</Wrapper>
			{ !! value && !! onReset && (
				<PanelRow>
					<Button isDestructive isSmall onClick={ onReset }>
						{ __( 'Reset', 'sixa' ) }
					</Button>
				</PanelRow>
			) }
		</PanelBody>
	);
}

PanelThemePicker.propTypes = {
	onChange: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	themes: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.string.isRequired,
			imageUri: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		} )
	),
	title: PropTypes.string,
	value: PropTypes.string,
};

PanelThemePicker.defaultProps = {
	onChange: () => {},
	onReset: undefined,
	themes: [],
	title: __( 'Themes', 'sixa' ),
	value: undefined,
};

export default ifCondition( ( { shouldRender, themes } ) => Boolean( shouldRender ) && isNonEmptyArray( themes ) )( PanelThemePicker );
