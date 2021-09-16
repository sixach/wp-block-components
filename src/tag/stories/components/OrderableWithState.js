/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { map, shuffle, take, without } from 'lodash';

/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Tag from '../../';
import Sortable from '../../../sortable';

function Orderable( { length, list } ) {
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
				<Tag action key={ tag } label={ tag } onRemove={ () => handleOnRemove( tag ) } />
			) ) }
		</OrderableWrapper>
	);
}

const OrderableWrapper = styled( Sortable )`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;

	.sixa-component-tag {
		cursor: grab;
		margin-bottom: calc( 4px * 2 );
	}
`;

export default Orderable;
