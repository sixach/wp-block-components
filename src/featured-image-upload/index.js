/**
 * Utility for libraries from the `Lodash`.
 */
import { has, toString } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { BaseControl, Button, ResponsiveWrapper } from '@wordpress/components';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect } from '@wordpress/data';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { Spinner } from './style';

/**
 * Media component to represent image element.
 */
import Media from '../media';

/**
 * Helper constants.
 */
import Constants from '../media-upload/constants';

/**
 * FeaturedImageUpload is a React component that could be displayed in place of the actual image.
 * This can be used to represent an example state prior to any actual image being placed.
 *
 * @function
 * @since	   1.11.1
 * @param 	   {Object}  	    props             Component properties.
 * @param 	   {string}  	    props.label    	  Label for representing a caption for the component in the user interface.
 * @param 	   {Function}  	    props.onChange    Function that receives the value of the image control.
 * @param 	   {string}  	    props.value       Image attachment ID.
 * @return     {JSX.Element}                      Image upload component to render.
 * @example
 *
 * <FeaturedImageUpload
 * 	   onChange={ ( value ) => setMeta( 'featured_media', value ) }
 *     value={ id }
 * />
 */
function FeaturedImageUpload( { label, onChange, value, ...otherProps } ) {
	const instanceId = useInstanceId( FeaturedImageUpload );
	const { hasPostThumbnail, thePostThumbnail } = useSelect(
		( select ) => {
			const { getMedia } = select( 'core' );
			const postThumbnail = getMedia( value );

			return {
				hasPostThumbnail: has( postThumbnail, 'id' ),
				thePostThumbnail: postThumbnail,
			};
		},
		[ value ]
	);
	const handleOnRemoveMedia = () => {
		onChange( '' );
	};
	const handleOnSelectMedia = ( media ) => {
		if ( ! media || ! media?.url ) {
			handleOnRemoveMedia();
			return;
		}

		onChange( toString( media?.id ) );
	};

	return (
		<BaseControl id={ `sixa-featured-image-upload-${ instanceId }` } label={ label }>
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={ Constants.IMAGE_MEDIA_TYPE }
					disableDropZone
					modalClass="editor-post-featured-image__media-modal"
					multiple={ false }
					onSelect={ handleOnSelectMedia }
					render={ ( { open } ) =>
						!! value ? (
							<div className="editor-post-featured-image editor-post-featured-image__container">
								{ ! Boolean( hasPostThumbnail ) ? (
									<Spinner />
								) : (
									<Button
										aria-label={ __( 'Edit or update the image', 'sixa' ) }
										className="editor-post-featured-image__preview"
										onClick={ open }
									>
										<ResponsiveWrapper
											isInline
											naturalWidth={ thePostThumbnail?.media_details?.width }
											naturalHeight={ thePostThumbnail?.media_details?.height }
										>
											<Media
												alt={ thePostThumbnail?.alt }
												className={ `wp-image-${ thePostThumbnail?.id }` }
												id={ thePostThumbnail?.id }
												mediaType={ Constants.IMAGE_MEDIA_TYPE }
												url={ thePostThumbnail?.source_url }
											/>
										</ResponsiveWrapper>
									</Button>
								) }
								<Button onClick={ handleOnRemoveMedia } isDestructive icon={ false } variant="link">
									{ __( 'Remove image', 'sixa' ) }
								</Button>
							</div>
						) : (
							<Button onClick={ open } className="editor-post-featured-image__toggle">
								{ __( 'Set featured image', 'sixa' ) }
							</Button>
						)
					}
					value={ thePostThumbnail }
					{ ...otherProps }
				/>
			</MediaUploadCheck>
		</BaseControl>
	);
}

FeaturedImageUpload.propTypes = {
	/**
	 * If this property is added, a label will be generated using label property as the content.
	 */
	label: PropTypes.string,
	/**
	 * A function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Image attachment ID.
	 */
	value: PropTypes.string,
};

FeaturedImageUpload.defaultProps = {
	label: __( 'Secondary Featured Image', 'sixa' ),
	onChange: () => {},
	value: undefined,
};

export default FeaturedImageUpload;
