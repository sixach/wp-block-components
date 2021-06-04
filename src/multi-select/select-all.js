/**
 * Retrieves the translation of text.
 *
 * @see     https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Text to display for selecting all options.
 *
 * @constant
 * @since 	     1.0.0
 * @type        {Array}
 * @ignore
 */
export default {
	value: '',
	/* translators: %1$s is replaced with "—" */
	label: sprintf( __( '%1$s Select All %1$s', 'sixa' ), '—' ),
};
