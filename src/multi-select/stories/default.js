/**
 * External dependencies
 */
import { map, shuffle, take, nth, split } from 'lodash';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import MultiSelect from '../';
import list from '../../utils/list';

function DefaultWithState( { length, withSearchField, withSelectAll, messages } ) {
	const [ options, setOptions ] = useState( [] );
	const [ selectedOptions, setSelectedOptions ] = useState( [] );
	const handleOnChange = ( value ) => {
		setSelectedOptions( value );
	};

	useEffect( () => {
		const items = take( shuffle( list ), length );
		setOptions( map( items, ( label ) => ( { label, value: nth( split( label, ' ' ) ) } ) ) );
	}, [ length ] );

	return (
		<MultiSelect
			options={ options }
			messages={ messages }
			withSearchField={ withSearchField }
			withSelectAll={ withSelectAll }
			selectedOptions={ selectedOptions }
			onChange={ handleOnChange }
		/>
	);
}

export default DefaultWithState;
