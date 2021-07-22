/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Sizes.
 *
 * Defines the sizes used in adjusting background image position
 * all hardcoded `size` values are based on the possible value of
 * this CSS property from MDN docs.
 *
 * @constant
 * @since 	    1.0.0
 * @type        {Array}
 * @see         https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
 * @ignore
 */
export default [
	{
		name: __( 'Auto' ),
		slug: 'auto',
	},
	{
		name: __( 'Cover' ),
		slug: 'cover',
	},
	{
		name: __( 'Contain' ),
		slug: 'contain',
	},
	{
		name: __( 'Custom' ),
		slug: 'custom',
	},
];
