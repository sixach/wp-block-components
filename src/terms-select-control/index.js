/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { groupBy, map } from 'lodash';

/**
 * Helper React hooks specific for Sixa projects.
 */
import { useGetTerms } from '@sixa/wp-react-hooks';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { TreeSelect } from '@wordpress/components';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose/
 */
import { ifCondition } from '@wordpress/compose';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useMemo } from '@wordpress/element';

/**
 * Internationalization utilities for client-side localization.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Renders a component is used to generate select input fields with
 * interface to select the parent page/term in a hierarchy of pages/terms.
 *
 * @function
 * @since	   1.13.0
 * @param 	   {Object}  	    props                  Component properties.
 * @param 	   {string}  	    props.label      	   Label property as the content.
 * @param	   {string}		    props.noOptionLabel    Label to represent empty selection.
 * @param 	   {Function}  	    props.onChange 	       Function that receives the value of the input.
 * @param 	   {string}  	    props.taxonomy    	   Taxonomy name that the term is part of.
 * @param 	   {string}  	    props.value            Link object value for the button component.
 * @return     {JSX.Element}                    	   Dropdown menu element to render.
 * @example
 *
 * <TermsSelectControl
 *     label={ { __( 'Category', 'sixa' ) } }
 *	   onChange={ ( value ) => setAttributes( { 'categories': value } ) }
 *	   taxonomy={ 'categories' }
 *     value={ '12' }
 * />
 */
function TermsSelectControl( { label, noOptionLabel, onChange, taxonomy, value, ...otherProps } ) {
	const { termsOptions } = useGetTerms( taxonomy );
	const termsTree = useMemo( () => {
		const flatTermsWithParentAndChildren = map( termsOptions, ( term ) => ( {
			children: [],
			parent: null,
			...term,
		} ) );

		const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
		if ( termsByParent.null && termsByParent.null.length ) {
			return flatTermsWithParentAndChildren;
		}
		const fillWithChildren = ( terms ) =>
			map( terms, ( term ) => {
				const children = termsByParent[ term.id ];
				return {
					...term,
					children: children && children.length ? fillWithChildren( children ) : [],
				};
			} );

		return fillWithChildren( termsByParent[ '0' ] || [] );
	}, [ termsOptions ] );

	return <TreeSelect { ...{ label, noOptionLabel, onChange } } selectedId={ value } tree={ termsTree } { ...otherProps } />;
}

TermsSelectControl.propTypes = {
	/**
	 * Label property as the content.
	 */
	label: PropTypes.string,
	/**
	 * Label to represent empty selection.
	 */
	noOptionLabel: PropTypes.string,
	/**
	 * Callback function to be triggered when the value of the select field change.
	 */
	onChange: PropTypes.func,
	/**
	 * Name of taxonomy object to return.
	 */
	taxonomy: PropTypes.string,
	/**
	 * The id of the currently selected term.
	 */
	value: PropTypes.string,
};

TermsSelectControl.defaultProps = {
	label: undefined,
	noOptionLabel: __( 'All', 'sixa' ),
	onChange: () => {},
	taxonomy: undefined,
	value: undefined,
};

export default ifCondition( ( { taxonomy } ) => Boolean( taxonomy ) )( TermsSelectControl );
