/**
 * The styled API for @emotion/react.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import styled from '@emotion/styled';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { CheckboxControl } from '@wordpress/components';

function Item({ value, label, isSelected, onChange }) {
	return (
		<CheckboxControl
			type="checkbox"
			checked={ isSelected }
			onChange={ ( checked ) => onChange( { value, label }, checked ) }
			label={ label }
		/>
	);
}

export default Item;
