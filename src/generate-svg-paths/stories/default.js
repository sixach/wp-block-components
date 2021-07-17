/**
 * External dependencies
 */
import { map, sampleSize } from 'lodash';
import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GenerateSvgPaths from '../';

function DefaultWithState( { length, size, icons } ) {
	const [ paths, setPaths ] = useState( [] );
	const instanceId = useInstanceId( GenerateSvgPaths );

	useEffect( () => {
		setPaths( map( sampleSize( icons, length ), ( i ) => i?.paths ) );
	}, [ length ] );

	return map( paths, ( icon, index ) => (
		<GenerateSvgPaths key={ `${ index }-${ instanceId }` } withSvgWrapper svgProps={ { width: size, height: size } } paths={ icon } />
	) );
}

export default DefaultWithState;
