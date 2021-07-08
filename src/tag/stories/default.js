/**
 * External dependencies
 */
import { map, shuffle, without, take } from 'lodash';
import { useState, useEffect } from '@wordpress/element';
import { Flex } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Tag from '../';
import list from '../../utils/list';

function Default( { length } ) {
	const [ items, setItems ] = useState( [] );
	const handleOnRemove = ( value ) => {
		setItems( ( i ) => without( i, value ) );
	};

	useEffect( () => {
		setItems( take( shuffle( list ), length ) );
	}, [ length ] );

	return (
		<Flex wrap justify="flex-start" direction="row">
			{ map( items, ( tag ) => (
				<Tag key={ tag } label={ tag } action onRemove={ () => handleOnRemove( tag ) } />
			) ) }
		</Flex>
	);
}

export default Default;
