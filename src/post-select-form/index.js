/**
 * Utility for libraries from the `Lodash`.
 */
import noop from 'lodash/noop';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

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
import { Button, Flex, Placeholder, ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { Select, Wrapper } from './style';

/**
 * Edit icon.
 */
import Icon from './icon';

/**
 * Form post selection that could be displayed in place of the actual data.
 * This can be used to represent an example state prior to any actual block content being placed.
 *
 * @function
 * @since	   1.6.0
 * @param      {Object}   	    props             	  Component properties.
 * @param      {string} 	    props.buttonText      Label to be displayed for the button.
 * @param      {boolean} 	    props.isEditing    	  Whether the form is in the editing state.
 * @param      {JSX.Element}    props.icon    	 	  If provided, renders an icon next to the label.
 * @param      {string} 	    props.instructions    Renders instruction text below label.
 * @param      {string} 	    props.label    		  Renders a label for the placeholder.
 * @param      {Function} 	    props.onCancel    	  Disable the editing state for this form.
 * @param      {Function} 	    props.onChange    	  A callback function invoked when the a product selected using the dropdown menu.
 * @param      {Array} 	   	    props.options    	  List of post options.
 * @param      {number}         props.value       	  Selected post id.
 * @return     {JSX.Element}                      	  Form element to render.
 * @example
 *
 * <PostSelectForm
 *     isEditing={ isEditing }
 *     instructions={ __( 'Select a product from the dropdown menu below:', 'sixa' ) }
 *     label={ __( 'Post', 'sixa' ) }
 *     onCancel={ toggleIsEditing }
 *     onChange={ ( value ) => setAttributes( { id: value } ) }
 *     options={ postsOptions }
 *     shouldRender
 *     value={ postId }
 *	/>
 */
function PostSelectForm( { buttonText, isEditing, icon, instructions, label, onCancel, onChange, options, value } ) {
	return Boolean( isEditing ) ? (
		<Placeholder instructions={ instructions } icon={ icon } label={ label }>
			<Flex align="flex-start">
				<Wrapper>
					<Select allowReset={ false } onChange={ onChange } options={ options } onFilterValueChange={ noop } value={ value } />
				</Wrapper>
				<Button disabled={ ! value } isPrimary={ value } isSecondary={ ! value } onClick={ onCancel }>
					{ buttonText }
				</Button>
			</Flex>
		</Placeholder>
	) : (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarButton icon={ <Icon /> } onClick={ onCancel } />
			</ToolbarGroup>
		</BlockControls>
	);
}

PostSelectForm.propTypes = {
	/**
	 * Label to be displayed for the button.
	 */
	buttonText: PropTypes.string,
	/**
	 * Whether the form is in the editing state.
	 */
	isEditing: PropTypes.bool,
	/**
	 * If provided, renders an icon next to the label.
	 */
	icon: PropTypes.oneOfType( [ PropTypes.string, PropTypes.element ] ),
	/**
	 * Renders instruction text below label.
	 */
	instructions: PropTypes.string,
	/**
	 * Renders a label for the placeholder.
	 */
	label: PropTypes.string,
	/**
	 * Function that disables the editing state.
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * List of post options.
	 */
	options: PropTypes.arrayOf( PropTypes.shape( { label: PropTypes.string, value: PropTypes.number } ) ),
	/**
	 * Selected post id.
	 */
	value: PropTypes.number,
};

PostSelectForm.defaultProps = {
	buttonText: __( 'Select' ),
	isEditing: false,
	icon: <Icon />,
	instructions: undefined,
	label: undefined,
	onCancel: () => {},
	onChange: () => {},
	options: [],
	value: undefined,
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( PostSelectForm );
