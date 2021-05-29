/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @ignore
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Flex, FlexBlock, FlexItem, Spinner } from '@wordpress/components';

/**
 * Spinners notify users that their action is being processed.
 *
 * @function
 * @since 	   1.0.0
 * @param  	   {Object}    props                  The props that were defined by the caller of this component.
 * @param      {string}    props.label            Label shown before the spinner.
 * @param      {string}    props.className        The class that will be added with “components-loading” to the classes of the wrapper div.
 * @return 	   {JSX.Element}                      Spinner element to signal the users that the processing of their request is underway.
 * @example
 *
 * <Loading label={ __( 'Loading posts…' ) } />
 */
function Loading( { label, className } ) {
	return (
		<Flex className={ classnames( 'components-loading', className ) }>
			{ label && <FlexBlock>{ label }</FlexBlock> }
			<FlexItem>
				<Spinner />
			</FlexItem>
		</Flex>
	);
}

export default Loading;
