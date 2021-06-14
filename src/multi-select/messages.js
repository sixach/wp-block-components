/**
 * Retrieves the translation of text.
 *
 * @see		https://developer.wordpress.org/block-editor/packages/packages-i18n/
 * @ignore
 */
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Default Messages.
 *
 * Defines the default values for labels and messages being printed
 * in the `MultiSelect` component in case none or only a subset is
 * provided.
 *
 * @constant
 * @since		1.1.0
 * @type		{Object}
 * @ignore
 */
export default {
	noResults: __( 'No results found for your search term', 'sixa' ),
	search: __( 'Search for items to display', 'sixa' ),
	selected: ( number ) =>
		sprintf(
			/* translators: Number of items selected from list. */
			_n( '%d item selected', '%d items selected', number, 'sixa' ),
			number
		),
};
