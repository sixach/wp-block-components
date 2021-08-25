/**
 * Runtime type checking for React props and similar objects.
 */
 import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * The styled components generated using @emotion/react API.
 *
 * @see    https://www.npmjs.com/package/@emotion/styled
 */
 import { Accordion } from './style';

/**
 * Internal dependencies
 */
import schema from './schema';

/**
 * Vertically collapsible content.
 *
 * @since 	   1.0.0
 * @param  	   {Object}         props                    The props that were defined by the caller of this component.
 * @param      {string}    	    props.heading            Text shown on the summary tag.
 * @param      {string}         props.content            Content shown inside the accordion.
 * @param      {string}         props.className          The class that will be added with “sixa-component-accordion" to the classes of the wrapper div.
 * @param      {string}         props.borderColor        Border color for the accordion.
 * @param      {string}         props.backgroundColor    Background color for the accordion.
 * @param      {string}         props.fontColor          Font color for the accordion text.
 * @param      {number}         props.borderThickness    Border thickness for the accordion.
 * @param      {boolean}        props.borderActive       Adds or removes a border.
 * @param      {boolean}        props.hasSchema          Adds or removes schema markup.
 * @return     {JSX.Element}                             Vertically collapsible content.
 * @example
 * 
 * <Accordion>
 *  <summary>
 *    Click to open accordion   
 *  </summary>
 *  <div>
 *    The accordion is now open.
 *  </div>
 * </Accordion>
 */
function AccordionStory( { heading, content, className, borderActive, borderColor, borderThickness, backgroundColor, fontColor, hasSchema} ){
    
    const appliedSchema = hasSchema ? schema : {};
    
    return (
        <Accordion
        className={ classnames( 'sixa-component-accordion', className ) }
        borderColor={ borderColor }
        borderThickness={ borderThickness }
        backgroundColor={ backgroundColor }
        active={ borderActive }
        fontColor={ fontColor }
        { ...appliedSchema.question }
        >
            <summary { ...appliedSchema.name }>
                { heading }
            </summary>
            <div { ...appliedSchema.answer }>
                <div { ...appliedSchema.text }>
                    { content }
                </div>
            </div>
        </Accordion>
    );
}

AccordionStory.propTypes = {
    /**
	 * Text shown on the summary tag.
	 */
	heading: PropTypes.string,
    /**
     * Content shown inside the accordion.
     */
    content: PropTypes.string,
    /**
     * Adds or removes a border.
     */
    borderActive: PropTypes.bool,
    /**
     * Border color for the accordion.
     */
    borderColor: PropTypes.string,
    /**
     * Border thickness for the accordion.
     */
    borderThickness: PropTypes.number,
    /**
     * 
     * Background color for the accordion.
     */
    backgroundColor: PropTypes.string,
    /**
     * Font color for the accordion text.
     */
    fontColor: PropTypes.string,
    /**
     * The CSS class name that will be appended to the Accordion.
     */
    className: PropTypes.string,
    /**
     * Adds or removes schema markup
     */
    hasSchema: PropTypes.bool,
}

AccordionStory.defaultProps = {
	heading: null,
	content: null,
	className: null,
	borderColor: null,
	backgroundColor: null,
	fontColor: null,
	borderThickness: null,
    borderActive: null,
    hasSchema: null,
};

export default AccordionStory;