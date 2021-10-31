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
import { Item, Skin, Wrapper } from './style';

/**
 * SkinPicker is a React component to render a UI that allows
 * users to select a desired skin from the options available.
 *
 * @function
 * @since	   2.0.0
 * @param 	   {Object} 		props 			  Component properties.
 * @param 	   {Function} 	    props.onChange    Trigger change event when any of the skins are selected.
 * @param 	   {Function} 	    props.onReset 	  Empty any stored skin object from the attributes.
 * @param 	   {Array} 		    props.skinList    List of map skin variations.
 * @param 	   {string} 		props.title       Title of the `PanelBody`.
 * @param 	   {string} 		props.value 	  Selected skin’s id.
 * @return     {JSX.Element}					  SkinPicker component to render.
 * @example
 *
 * <PanelSkinPicker
 *     onChange={ handleOnChangeSkin }
 *     onReset={ handleOnResetSkin }
 *     shouldRender={ withApi }
 *     skinList={ skinList }
 *     title={ __( 'Skins', 'sixa' ) }
 *     value={ skin?.id }
 * />
 */
function PanelSkinPicker( { onChange, onReset, skinList, title, value } ) {
	return (
		<PanelBody initialOpen title={ title }>
			<Wrapper className="block-editor-block-types-list" justify="flex-start" wrap>
				{ map( skinList, ( { id, imageUri, title: name } ) => {
					const isSelected = isEqual( id, value );

					return (
						<Item
							className={ classnames( id, 'block-editor-block-types-list__list-item', {
								'selected-skin': isSelected,
							} ) }
							key={ id }
						>
							<Tooltip position="top" text={ name }>
								<Skin
									className="editor-block-list-item-button"
									imageUri={ imageUri }
									isSelected={ isSelected }
									isPrimary
									onClick={ () => onChange( id ) }
								>
									<VisuallyHidden>{ name }</VisuallyHidden>
								</Skin>
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

PanelSkinPicker.propTypes = {
	onChange: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	skinList: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.string.isRequired,
			imageUri: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		} )
	),
	title: PropTypes.string,
	value: PropTypes.string,
};

PanelSkinPicker.defaultProps = {
	onChange: () => {},
	onReset: undefined,
	skinList: [],
	title: __( 'Skins', 'sixa' ),
	value: undefined,
};

export default ifCondition( ( { shouldRender, skinList } ) => Boolean( shouldRender ) && isNonEmptyArray( skinList ) )( PanelSkinPicker );
