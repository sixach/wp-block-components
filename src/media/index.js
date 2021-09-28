/**
 * Utility for libraries from the `Lodash`.
 */
import { isEqual, isUndefined } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Helper constants.
 */
import Constants from '../media-upload/constants';

/**
 * Media component to represent image or video element depending
 * on the media type being stored within the block attributes.
 *
 * @function
 * @since	   1.5.0
 * @param 	   {Object}  	    props              Component properties.
 * @param 	   {string}  	    props.alt    	   Alternative text description of the image.
 * @param 	   {string}  	    props.className    The CSS class name(s) that will be added to the component element.
 * @param 	   {number}  	    props.id           ID of selected or stored media element.
 * @param 	   {string}  	    props.mediaType    Media type such as Image or Video file type.
 * @param 	   {string}  	    props.url          Path to the image or video file.
 * @return     {JSX.Element}                       Media placeholder component to render.
 * @example
 *
 * <Media
 *     className={ `${ className }__media` }
 *     id={ id }
 *     mediaType={ mediaType }
 *     url={ url }
 * />
 */
function Media( { alt, className, id, mediaType, url, ...otherProps } ) {
	return (
		<>
			{ isEqual( mediaType, Constants.IMAGE_MEDIA_TYPE ) && (
				<img alt={ alt } className={ classnames( className, { [ `wp-image-${ id }` ]: id } ) } src={ url } { ...otherProps } />
			) }
			{ isEqual( mediaType, Constants.VIDEO_MEDIA_TYPE ) && (
				<video
					autoPlay={ false }
					className={ className }
					controls
					controlsList="nodownload nofullscreen noremoteplayback"
					loop
					muted
					playsInline
					src={ url }
					{ ...otherProps }
				/>
			) }
		</>
	);
}

Media.propTypes = {
	/**
	 * Alternative text description of the image.
	 */
	alt: PropTypes.string,
	/**
	 * Component specific CSS class names.
	 */
	className: PropTypes.string,
	/**
	 * ID of selected or stored media element.
	 */
	id: PropTypes.number,
	/**
	 * Media type such as Image or Video file type.
	 */
	mediaType: PropTypes.string,
	/**
	 * Path to the image or video file.
	 */
	url: PropTypes.string,
};

Media.defaultProps = {
	alt: undefined,
	className: undefined,
	id: undefined,
	mediaType: Constants.IMAGE_MEDIA_TYPE,
	url: undefined,
};

export default ifCondition( ( { id } ) => ! isUndefined( id ) )( Media );
