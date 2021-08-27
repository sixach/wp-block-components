/**
 * Utility for libraries from the `Lodash`.
 */
import { get, isUndefined } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * HTML to React parser.
 *
 * @see    https://www.npmjs.com/package/html-react-parser
 */
import parse from 'html-react-parser';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { formattedContent } from '@sixa/wp-block-utils';

/**
 * React component for wrapping children based on a condition.
 */
import ConditionalWrap from '../conditional-wrap';

/**
 * Component used as equivalent of Fragment with unescaped HTML.
 */
import InnerHTML from '../inner-html';

/**
 * Conditionally wraps a given content-collection node or object with an HTML element
 * and converts all numeric HTML entities to their named counterparts.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * 			   Introduced type checking.
 * @since 	   1.0.2
 * @param  	   {Object}       	 props             The props that were defined by the caller of this component.
 * @param  	   {Object}       	 props.content     The content object.
 * @param  	   {Array|string}    props.path        Path of the property or node element to retrieve.
 * @param  	   {string}       	 props.tagName     Tag name of the wrapper element.
 * @param  	   {Object}       	 props.tagProps    Props that will be passed through to the wrapper element.
 * @return 	   {JSX.Element}                   	   Generated HTML output of the elements.
 * @example
 *
 * <PrintHTML content={ product } path="price_html" tagName="span" tagProps={ { className: 'price' } } />
 */
function PrintHTML( { content, path, tagName, tagProps } ) {
	const isTagName = ! isUndefined( tagName );
	const getContent = formattedContent( get( content, path ) );

	return (
		<ConditionalWrap
			condition={ isTagName }
			wrap={ ( children ) => (
				<InnerHTML tagName={ tagName } { ...tagProps }>
					{ children }
				</InnerHTML>
			) }
		>
			{ isTagName ? getContent : parse( getContent ) }
		</ConditionalWrap>
	);
}

PrintHTML.propTypes = {
	/**
	 * The content object.
	 */
	content: PropTypes.object.isRequired,
	/**
	 * Path of the property or node element to retrieve.
	 */
	path: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
	/**
	 * Tag name of the wrapper element.
	 */
	tagName: PropTypes.string,
	/**
	 * Props that will be passed through to the wrapper element.
	 */
	Object: PropTypes.object,
};

PrintHTML.defaultProps = {
	content: {},
	path: null,
	tagName: undefined,
	tagProps: {},
};

export default PrintHTML;
