/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Building blocks necessary to create our own component.
 *
 * @ignore
 */
import { components } from 'react-select';

/**
 * The styled components generated using @emotion/react API.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/@emotion/styled
 */
import { SelectionLimit } from './style';

export const Option = ( props ) => {
	return (
		<components.Option { ...props }>
			<input type="checkbox" checked={ props.isSelected } onChange={ () => null } />
			<span>{ props.label }</span>
		</components.Option>
	);
};

export const Menu = ( props ) => {
	const optionSelectedLength = props.getValue().length || 0;
	const selectionLimitProp = props.selectProps.selectProps.selectionLimit;

	return (
		<components.Menu { ...props }>
			{ optionSelectedLength < selectionLimitProp ? (
				props.children
			) : (
				/* eslint-disable-next-line @wordpress/i18n-translator-comments */
				<SelectionLimit>{ sprintf( __( 'Only %1$s options may be selected', 'sixa' ), selectionLimitProp ) }</SelectionLimit>
			) }
		</components.Menu>
	);
};
