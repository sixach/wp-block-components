/**
 * Utility for libraries from the `Lodash`.
 */
import { isEqual, isUndefined } from 'lodash';

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
 * Blob utilities for WordPress.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blob/
 */
import { isBlobURL, getBlobTypeByURL } from '@wordpress/blob';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { BlockControls, BlockIcon, MediaPlaceholder, MediaUploadCheck } from '@wordpress/block-editor';

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
 * Import icons from the WordPress icon library.
 *
 * @see    https://github.com/WordPress/gutenberg/blob/trunk/packages/icons/README.md
 */
import { media as mediaIcon, trash } from '@wordpress/icons';

/**
 * Helper constants.
 */
import Constants from './constants';

/**
 * MediaUpload is a React component that could be displayed in place of the actual media.
 * This can be used to represent an example state prior to any actual media being placed.
 *
 * @function
 * @since	   1.5.0
 * @param 	   {Object}  	    props             Component properties.
 * @param 	   {Function}  	    props.onChange    Function that receives the value of the media control.
 * @param 	   {number}  	    props.value       ID of selected or stored media element.
 * @return     {JSX.Element}                      Media placeholder component to render.
 * @example
 *
 * <MediaUpload
 * 	   onChange={ ( value ) => setAttributes( { ...value } ) }
 *	   shouldRender={ isLinkControlVisible }
 *     value={ id }
 * />
 */
function MediaUpload( { onChange, value, ...otherProps } ) {
	const handleOnRemoveMedia = () => {
		onChange( { alt: undefined, id: undefined, mediaType: undefined, url: undefined } );
	};
	const handleOnSelectMedia = ( media ) => {
		if ( ! media || ! media?.url ) {
			handleOnRemoveMedia();
			return;
		}

		if ( isBlobURL( media?.url ) ) {
			media.type = getBlobTypeByURL( media.url );
		}

		let mediaType;
		// for media selections originated from a file upload.
		if ( media?.media_type ) {
			if ( isEqual( media.media_type, Constants.IMAGE_MEDIA_TYPE ) ) {
				mediaType = Constants.IMAGE_MEDIA_TYPE;
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// Videos contain the media type of 'file' in the object returned from the rest api.
				mediaType = Constants.VIDEO_MEDIA_TYPE;
			}
		} else {
			// for media selections originated from existing files in the media library.
			if ( ! isEqual( media?.type, Constants.IMAGE_MEDIA_TYPE ) && ! isEqual( media?.type, Constants.VIDEO_MEDIA_TYPE ) ) {
				return;
			}
			mediaType = media?.type;
		}

		onChange( {
			alt: media?.alt,
			id: media?.id,
			mediaType,
			url: media?.url,
		} );
	};

	return isUndefined( value ) ? (
		<MediaUploadCheck fallback={ { instructions: __( 'To edit the media file, you need permission to upload media.', 'sixa' ) } }>
			<MediaPlaceholder
				allowedTypes={ [ Constants.IMAGE_MEDIA_TYPE, Constants.VIDEO_MEDIA_TYPE ] }
				disableDropZone
				icon={ <BlockIcon icon={ mediaIcon } /> }
				labels={ {
					title: __( 'Media', 'sixa' ),
					instructions: __( 'Upload an image or video file, or pick one from your media library.', 'sixa' ),
				} }
				multiple={ false }
				onSelect={ handleOnSelectMedia }
				value={ { id: value } }
				{ ...otherProps }
			/>
		</MediaUploadCheck>
	) : (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarButton icon={ trash } onClick={ handleOnRemoveMedia } title={ __( 'Remove media', 'sixa' ) } />
			</ToolbarGroup>
		</BlockControls>
	);
}

MediaUpload.propTypes = {
	/**
	 * Callback function to be triggered when the value of the input change.
	 */
	onChange: PropTypes.func,
	/**
	 * Value of the control.
	 */
	value: PropTypes.number,
};

MediaUpload.defaultProps = {
	onChange: () => {},
	shouldRender: true,
	value: undefined,
};

export default ifCondition( ( { shouldRender } ) => Boolean( shouldRender ) )( MediaUpload );
