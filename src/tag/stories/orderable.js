/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { map, shuffle, without, take } from 'lodash';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Tag from '../';
import Sortable from '../../sortable';
import list from '../../utils/list';

function Orderable( { length } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnRemove = ( value ) => {
		setItems( ( i ) => without( i, value ) );
	};
	const handleOnSortEnd = ( value ) => {
		setItems( map( value, ( { key } ) => key ) );
	};

	useEffect( () => {
		setItems( take( shuffle( list ), length ) );
	}, [ length ] );

	return (
		<OrderableWrapper onChange={ handleOnSortEnd }>
			{ map( items, ( tag ) => (
				<Tag key={ tag } label={ tag } action onRemove={ () => handleOnRemove( tag ) } />
			) ) }
		</OrderableWrapper>
	);
}

const OrderableWrapper = styled( Sortable )`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;

	.sixa-component-tag {
		cursor: grab;
		margin-bottom: calc( 4px * 2 );
	}
`;

export default Orderable;
