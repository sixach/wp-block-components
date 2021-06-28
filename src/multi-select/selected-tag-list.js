/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map, nth, forEach } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see		https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 * @ignore
 */
import { useState, useEffect, useMemo, useCallback } from '@wordpress/element';

/**
 * The styled Tag component generated using @emotion/react API.
 *
 * @see		https://www.npmjs.com/package/@emotion/styled
 * @ignore
 */
import { StyledTag } from '../tag/style';

/**
 * The styled component wrapper generated using @emotion/react API.
 *
 * @see		https://www.npmjs.com/package/@emotion/styled
 * @ignore
 */
import { SelectedTagListWrapper } from './style';

/**
 * Horizontal list of Tags.
 * This component is used in MultiSelect to render the selected options as a list of Tags. Tag items are
 * provided as { label, value } pairs and can be deselected by clicking the remove button.
 *
 * @function
 * @since		1.2.0
 * @param		{Object}		props				The props that were defined by the caller of this component.
 * @param		{Array}			props.items			List of items that should be displayed as Tags.
 * @param		{Function}		props.onChange		Callback function to be triggered when the user finishes a sorting gesture.
 * @param		{Function}		props.onRemove		Callback function to trigger when the remove button in a tag is clicked.
 * @return		{JSX.Element}						Horizontal list of Tags.
 * @example
 *
 * <SelectedTagList
 * 		items={ selectedOptions}
 * 		onChange={ onChange }
 * 		onRemove={ handleOnClickSelectedOptionTag }
 * 	/>
 */
function SelectedTagList( { items, onChange, onRemove } ) {
	const [ options, setOptions ] = useState( [] );
	const { values, labels } = useMemo( () => {
		const tempValues = [];
		const tempLabels = [];

		forEach( items, ( { value, label } ) => {
			tempValues.push( value );
			tempLabels.push( label );
		} );
		return {
			values: tempValues,
			labels: tempLabels,
		};
	}, [ items ] );
	const handleOnChange = useCallback( ( newItems ) => {
		onChange( map( newItems, ( { props: { value } } ) => value ) );
	}, [] );

	useEffect( () => {
		setOptions(
			map( items, ( i, index ) => (
				<StyledTag key={ index } label={ nth( labels, index ) } value={ nth( values, index ) } onRemove={ () => onRemove( index ) } />
			) )
		);
	}, [ items ] );

	return <SelectedTagListWrapper className="sixa-component-multiselect__tag-list" items={ options } onChange={ handleOnChange } />;
}

SelectedTagList.propTypes = {
	items: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default SelectedTagList;
