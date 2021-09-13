/**
 * External dependencies
 */
import { map, sampleSize } from 'lodash';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GenerateSvgPaths from '../../';

function DefaultWithState( { length, icons, size } ) {
	const [ paths, setPaths ] = useState( [] );
	const instanceId = useInstanceId( GenerateSvgPaths );

	useEffect( () => {
		setPaths( map( sampleSize( icons, length ), ( i ) => i?.paths ) );
	}, [ length ] );

	return map( paths, ( icon, index ) => (
		<GenerateSvgPaths key={ `${ index }-${ instanceId }` } paths={ icon } svgProps={ { height: size, width: size } } withSvgWrapper />
	) );
}

export default DefaultWithState;
