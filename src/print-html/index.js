/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, isUndefined } from 'lodash';

/**
 * HTML to React parser.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/html-react-parser
 */
import parse from 'html-react-parser';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 */
import { formattedContent } from '@sixach/wp-block-utils';

/**
 * React component for wrapping children based on a condition.
 *
 * @ignore
 */
import ConditionalWrap from '../conditional-wrap';

/**
 * Component used as equivalent of Fragment with unescaped HTML.
 *
 * @ignore
 */
import InnerHTML from '../inner-html';

/**
 * Conditionally wraps a given content-collection node or object with an HTML element
 * and converts all numeric HTML entities to their named counterparts.
 *
 * @function
 * @since 	   1.0.2
 * @param  	   {Object}       props             		The props that were defined by the caller of this component.
 * @param  	   {Object}       props.content             The content object.
 * @param  	   {Array|string} props.path              	Path of the property or node element to retrieve.
 * @param  	   {string}       props.tagName           	Tag name of the wrapper element.
 * @param  	   {string}       props.tagProps          	Props that will be passed through to the wrapper element.
 * @return 	   {JSX.Element}                   		 	Generated HTML output of the elements.
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

export default PrintHTML;
