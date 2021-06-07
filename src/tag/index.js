/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Button } from '@wordpress/components';

/**
 *
 * @param label
 * @param onRemove
 * @param className
 * @returns {JSX.Element}
 * @constructor
 */
function Tag({ label, onRemove, className }) {
	return (
		<span className={ className }>
			{ label }
			<Button variant="link" icon="remove" isSmall onClick={ onRemove } />
		</span>
	);
}

export default Tag;
