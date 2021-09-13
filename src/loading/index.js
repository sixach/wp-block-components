/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Flex, FlexItem, Spinner } from '@wordpress/components';

/**
 * Spinners notify users that their action is being processed.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.0
 * @param  	   {Object}         props              The props that were defined by the caller of this component.
 * @param      {string}         props.className    The class that will be added with “sixa-component-loading” to the classes of the wrapper div.
 * @param      {string}    	    props.label        Label shown before the spinner.
 * @return     {JSX.Element}                       Spinner element to signal the users that the processing of their request is underway.
 * @example
 *
 * <Loading label={ __( 'Loading posts…' ) } />
 */
function Loading( { className, label } ) {
	return (
		<Flex className={ classnames( 'sixa-component-loading', className ) } justify="flex-start">
			{ label && <FlexItem>{ label }</FlexItem> }
			<FlexItem>
				<Spinner />
			</FlexItem>
		</Flex>
	);
}

Loading.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * Label shown before the spinner.
	 */
	label: PropTypes.string,
};

Loading.defaultProps = {
	className: undefined,
	label: undefined,
};

export default Loading;
