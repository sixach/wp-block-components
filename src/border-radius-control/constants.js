/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { Platform } from '@wordpress/element';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Constants.
 */
const isWeb = 'web' === Platform.OS;

/**
 * The object exported from this file has been determined to be frozen mainly
 * to prevent new properties from being added to it, existing properties from
 * being removed, and avoid the values of existing properties from being changed.
 */
export default Object.freeze( {
	ALL_UNITS: [
		{
			a11yLabel: __( 'Pixels (px)', 'sixa' ),
			default: '',
			label: isWeb ? 'px' : __( 'Pixels (px)', 'sixa' ),
			step: 1,
			value: 'px',
		},
		{
			a11yLabel: __( 'Percent (%)', 'sixa' ),
			default: '',
			label: isWeb ? '%' : __( 'Percentage (%)', 'sixa' ),
			step: 0.1,
			value: '%',
		},
		{
			a11yLabel: _x( 'ems', 'Relative to parent font size (em)', 'sixa' ),
			default: '',
			label: isWeb ? 'em' : __( 'Relative to parent font size (em)', 'sixa' ),
			step: 0.01,
			value: 'em',
		},
		{
			a11yLabel: _x( 'rems', 'Relative to root font size (rem)', 'sixa' ),
			default: '',
			label: isWeb ? 'rem' : __( 'Relative to root font size (rem)', 'sixa' ),
			step: 0.01,
			value: 'rem',
		},
	],
	DEFAULT_VALUES: {
		topLeft: null,
		topRight: null,
		bottomLeft: null,
		bottomRight: null,
	},
} );
