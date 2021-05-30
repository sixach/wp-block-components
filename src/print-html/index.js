/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { get, isUndefined } from 'lodash';

/**
 * Utility helper methods specific for Sixa projects.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/conditional-wrap
 */
import { formattedContent } from '@sixach/wp-block-utils';

/**
 * React component for wrapping children based on a condition.
 *
 * @ignore
 * @see 	https://www.npmjs.com/package/conditional-wrap
 */
import ConditionalWrap from 'conditional-wrap';

/**
 * Component used as equivalent of Fragment with unescaped HTML.
 *
 * @ignore
 */
import InnerHTML from '../inner-html';

/**
 * Conditionally wraps a given post-collection node or object with an HTML element 
 * and converts all numeric HTML entities to their named counterparts.
 *
 * @function
 * @since 	   1.0.0
 * @param  	   {Object}       props             		The props that were defined by the caller of this component.
 * @param  	   {Object}       props.post              	The post object.
 * @param  	   {Array|string} props.path              	Path of the property or node element to retrieve.
 * @param  	   {string}       props.tagName           	Tag name of the wrapper element.
 * @param  	   {string}       props.tagProps          	Props that will be passed through to the wrapper element.
 * @return 	   {JSX.Element}                   		 	Generated HTML output of the elements.
 * @example
 *
 * <PrintHTML post={ product } path="price_html" tagName="span" tagProps={ { className: 'price' } } />
 */
function PrintHTML( { post, path, tagName, tagProps } ) {
	return (
		<ConditionalWrap
			condition={ ! isUndefined( tagName ) }
			wrap={ ( children ) => (
				<InnerHTML tagName={ tagName } { ...tagProps }>
					{ children }
				</InnerHTML>
			) }
		>
			{ formattedContent( get( post, path ) ) }
		</ConditionalWrap>
	);
}

export default PrintHTML;
