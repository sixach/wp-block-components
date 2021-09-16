/**
 * WordPress dependencies
 */
import { Fragment, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BackgroundSizeControl from '../../';
import Image from './Image';

function DefaultWithState( { label, help, allowReset } ) {
	const [ size, setSize ] = useState( {} );
	const handleOnChange = ( value ) => {
		setSize( value );
	};

	return (
		<Fragment>
			<Image size={ size } />
			<BackgroundSizeControl label={ label } help={ help } value={ size } onChange={ handleOnChange } allowReset={ allowReset } />
		</Fragment>
	);
}

export default DefaultWithState;
