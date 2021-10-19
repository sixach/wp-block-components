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
import { ToolbarGroup } from '@wordpress/components';

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
import { NumericControl } from './style';

/**
 * NumberToolbar is a React component that renders an input field in
 * the toolbar that is mainly used to let the user enter a number.
 *
 * @function
 * @since	   1.9.0
 * @param 	   {Object}  	    props             Component properties.
 * @param 	   {Function}  	    props.onChange    Function that receives the value of the number control.
 * @param 	   {Object}  	    props.value       The current value of the number input.
 * @return     {JSX.Element}                      Visibility toolbar component to render.
 * @example
 *
 * <NumberToolbar
 * 	   onChange={ ( value ) => setAttributes( { number: value } ) }
 *	   shouldRender={ isEditing }
 *     value={ number }
 * />
 */
function NumberToolbar( { onChange, value, ...otherProps } ) {
	return (
		<BlockControls group="other">
			<ToolbarGroup>
				<NumericControl dragDirection="n" hideHTMLArrows isShiftStepEnabled={ false } onChange={ onChange } value={ value } { ...otherProps } />
			</ToolbarGroup>
		</BlockControls>
	);
}

NumberToolbar.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.number,
};

NumberToolbar.defaultProps = {
	onChange: () => {},
	value: 0,
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( NumberToolbar );
