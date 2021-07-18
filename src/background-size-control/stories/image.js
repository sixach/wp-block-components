/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { isEqual } from 'lodash';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

function Image( { size } ) {
	const isCustom = isEqual( 'custom', size?.selection );

	return (
		<Fragment>
			<small>{ __( 'Preview' ) }</small>
			<Placeholder
				image="https://s.w.org/images/core/5.3/MtBlanc1.jpg"
				isCustom={ isCustom }
				sizeSelection={ size?.selection }
				positionX={ size?.width || '' }
				positionY={ size?.height || '' }
			/>
		</Fragment>
	);
}

const Placeholder = styled.div`
	width: 100%;
	height: 175px;
	margin-bottom: 20px;
	background-image: url( ${ ( { image } ) => image } );
	background-size: ${ ( { isCustom, sizeSelection, positionX, positionY } ) => ( isCustom ? `${ positionX } ${ positionY }` : sizeSelection ) };
`;

export default Image;
