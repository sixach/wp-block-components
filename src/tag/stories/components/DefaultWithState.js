/**
 * External dependencies
 */
import { map, shuffle, take, without } from 'lodash';

/**
 * WordPress dependencies
 */
import { Flex } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Tag from '../../';

function Default( { length, list } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnRemove = ( value ) => {
		setItems( ( i ) => without( i, value ) );
	};

	useEffect( () => {
		setItems( take( shuffle( list ), length ) );
	}, [ length ] );

	return (
		<Flex direction="row" justify="flex-start" wrap>
			{ map( items, ( tag ) => (
				<Tag action key={ tag } label={ tag } onRemove={ () => handleOnRemove( tag ) } />
			) ) }
		</Flex>
	);
}

export default Default;
