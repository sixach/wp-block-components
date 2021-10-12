/**
 * Sixa icon library.
 */
import { trash } from '@sixa/icon-library';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { BlockControls, MediaReplaceFlow } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 */
import GenerateSvgPaths from '../generate-svg-paths';

/**
 * Helper constants.
 */
import Constants from '../media-upload/constants';

/**
 * MediaUploadToolbar is a React component that renders a toolbar of icon buttons.
 * This component is designed to allow uploading, replacing and removing cover medias.
 *
 * @function
 * @since	   1.7.0
 * @param 	   {Object}  	    props             Component properties.
 * @param 	   {Function}  	    props.onChange    Function that receives the value of the media control.
 * @param 	   {Object}  	    props.value       ID and URL for the selected or stored media element.
 * @return     {JSX.Element}                      Media placeholder component to render.
 * @example
 *
 * <MediaUploadToolbar
 * 	   onChange={ ( value ) => setAttributes( { ...value } ) }
 *	   shouldRender={ isEditing }
 *     value={ { id: 11, url: 'http://dev.local/wp-content/uploads/2019/01/image.jpg' } }
 * />
 */
function MediaUploadToolbar( { onChange, value, ...otherProps } ) {
	const { id, url } = value;
	const handleOnRemoveMedia = () => {
		onChange( { id: undefined, url: undefined } );
	};
	const handleOnSelectMedia = ( media ) => {
		if ( ! media || ! media?.url ) {
			handleOnRemoveMedia();
			return;
		}

		onChange( {
			id: media?.id,
			url: media?.url,
		} );
	};

	return (
		<BlockControls group="other">
			<MediaReplaceFlow
				allowedTypes={ [ Constants.IMAGE_MEDIA_TYPE, Constants.VIDEO_MEDIA_TYPE ] }
				mediaId={ id }
				mediaURL={ url }
				name={ ! url ? __( 'Add Media', 'sixa' ) : __( 'Replace', 'sixa' ) }
				onSelect={ handleOnSelectMedia }
				{ ...otherProps }
			/>
			{ !! id && (
				<ToolbarGroup>
					<ToolbarButton
						icon={ <GenerateSvgPaths paths={ trash?.paths } withSvgWrapper /> }
						onClick={ handleOnRemoveMedia }
						title={ __( 'Remove Media', 'sixa' ) }
					/>
				</ToolbarGroup>
			) }
		</BlockControls>
	);
}

MediaUploadToolbar.propTypes = {
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.shape( {
		id: PropTypes.number,
		url: PropTypes.string,
	} ),
};

MediaUploadToolbar.defaultProps = {
	onChange: () => {},
	shouldRender: true,
	value: {},
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( MediaUploadToolbar );
