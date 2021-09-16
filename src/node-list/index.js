/**
 * Utility for libraries from the `Lodash`.
 */
import { compact, concat, includes, map, without } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { ToggleControl } from '@wordpress/components';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useCallback } from '@wordpress/element';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
import { List } from './style';

/**
 * List of HTML nodes to be displayed when post item queried over.
 *
 * @function
 * @since	   1.5.0
 * @param      {Object}         props                Block meta-data properties.
 * @param      {string}         props.className      The CSS class name(s) that will be added to the wrapper element.
 * @param      {Array}          props.hiddenNodes    HTML nodes that are set to be hidden from the view.
 * @param      {Object}    	    props.nodeList 	     All HTML node list items.
 * @param      {Function}       props.onChange 	     Function that receives the value of the control.
 * @return     {JSX.Element}                 	     Node list control to render.
 * @example
 *
 * <NodeList
 *     hiddenNodes={ [ "SixaRecentPostsBlock\\get_more_html" ] }
 *     nodeList={ { "SixaRecentPostsBlock\\get_image_html": "Featured image", "SixaRecentPostsBlock\\get_title_html": "Title", } }
 *     onChange={ ( value ) => setAttributes( { hiddenNodes: value } ) }
 * />
 */
function NodeList( { className, hiddenNodes, nodeList, onChange } ) {
	const handleOnChange = useCallback(
		( isHidden, method ) => {
			let newNodes = [];
			if ( isHidden ) {
				newNodes = concat( hiddenNodes, method );
			} else {
				newNodes = without( hiddenNodes, method );
			}
			onChange( compact( newNodes ) );
		},
		[ hiddenNodes ]
	);

	return (
		<ul className={ classnames( 'sixa-component-node-list', className ) }>
			{ map( nodeList, ( title, method ) => {
				const isHidden = ! includes( hiddenNodes, method );
				/* translators: 1: Method label, 2: Visibility status. */
				const help = sprintf( __( '%1$s is %2$s.', 'sixa' ), title, isHidden ? __( 'visible', 'sixa' ) : __( 'hidden', 'sixa' ) );

				return (
					<List key={ method }>
						<ToggleControl checked={ Boolean( isHidden ) } help={ help } label={ title } onChange={ () => handleOnChange( isHidden, method ) } />
					</List>
				);
			} ) }
		</ul>
	);
}

NodeList.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * HTML nodes that are set to be hidden from the view.
	 */
	hiddenNodes: PropTypes.arrayOf( PropTypes.string ),
	/**
	 * All HTML node list items.
	 */
	nodeList: PropTypes.objectOf( PropTypes.string ),
	/**
	 * Function that receives the value of the control.
	 */
	onChange: PropTypes.func.isRequired,
};

NodeList.defaultProps = {
	className: undefined,
	hiddenNodes: [],
	nodeList: {},
	onChange: () => {},
};

export default NodeList;
