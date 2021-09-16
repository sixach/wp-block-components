/**
 * External dependencies
 */
import { map, nth, shuffle, split, take } from 'lodash';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import MultiSelect from '../../';

function DefaultWithState( { length, list, withSearchField, withSelectAll, messages } ) {
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
			messages={ messages }
			onChange={ handleOnChange }
			options={ options }
			selectedOptions={ selectedOptions }
			withSearchField={ withSearchField }
			withSelectAll={ withSelectAll }
		/>
	);
}

export default DefaultWithState;
