/**
 * Utility for libraries from the `Lodash`.
 */
import { map } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * Move an array item to a different position.
 *
 * @see    https://www.npmjs.com/package/array-move
 */
import arrayMove from 'array-move';

/**
 * A React component to sort items in lists or grids.
 *
 * @see    https://www.npmjs.com/package/react-easy-sort
 */
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Import icons from the WordPress icon library.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/
 */
import { Icon, dragHandle } from '@wordpress/icons';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Flex } from '@wordpress/components';

/**
 * Sortable component designed to provide the ability to provide a set of higher-order components
 * to turn any collection of elements given into an accessible and touch-friendly sortable list.
 *
 * @function
 * @since	   1.3.0
 * 			   Added default props.
 *  		   Indented 4 spacing.
 * @since	   1.2.0
 * @param	   {Object}		    props                         The props that were defined by the caller of this component.
 * @param      {string}         props.className               The CSS class name(s) that will be added to the wrapper element.
 * @param      {string}         props.draggedItemClassName    The CSS class name(s) that will be added to the item being dragged.
 * @param  	   {boolean} 		props.withSortableKnob        Whether the item should be allowed to only be draggable from a specific (knob) handle.
 * @param  	   {JSX.Element} 	props.children             	  Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param	   {Function}		props.onChange 			      Callback function to be triggered when the user finishes a sorting gesture.
 * @return	   {JSX.Element}        					      Sortable list component.
 * @example
 *
 * <Sortable
 *     onChange={ ( value ) => setAttributes( { items: value } ) }
 * >
 *     { map( items, ( { value, label }, index ) => (
 *         <StyledTag key={ value } label={ label } value={ value } onRemove={ () => onRemove( index ) } />
 *	   ) ) }
 * </Sortable>
 */
function Sortable( { className, draggedItemClassName, withSortableKnob = false, children = [], onChange } ) {
	const instanceId = useInstanceId( Sortable );
	const handleOnSortEnd = ( oldIndex, newIndex ) => {
		const sortedItems = arrayMove( children, oldIndex, newIndex );
		onChange( sortedItems );
	};

	return (
		<SortableList
			onSortEnd={ handleOnSortEnd }
			className={ classnames( 'sixa-component-sortable', className ) }
			draggedItemClassName={ classnames( 'dragged', draggedItemClassName ) }
		>
			{ map( children, ( item, index ) => (
				<SortableItem key={ `${ index }-${ instanceId }` }>
					<Flex className="sixa-component-sortable__item" expanded={ false } align="center" direction="row">
						{ withSortableKnob && (
							<SortableKnob>
								<div className="sixa-component-sortable__knob">
									<Icon icon={ dragHandle } />
								</div>
							</SortableKnob>
						) }
						{ item }
					</Flex>
				</SortableItem>
			) ) }
		</SortableList>
	);
}

Sortable.propTypes = {
	/**
	 * The CSS class name that will be appended to the wrapper div.
	 */
	className: PropTypes.string,
	/**
	 * The CSS class name that will be added to the item being dragged.
	 */
	draggedItemClassName: PropTypes.string,
	/**
	 * Allow component to be only draggable only from a specific (knob) handle.
	 */
	withSortableKnob: PropTypes.bool,
	/**
	 * React elements that are being passed as children.
	 */
	children: PropTypes.arrayOf( PropTypes.element ).isRequired,
	/**
	 * Callback function to be triggered when the user finishes a sorting gesture.
	 */
	onChange: PropTypes.func.isRequired,
};

Sortable.defaultProps = {
	className: null,
	draggedItemClassName: null,
	withSortableKnob: false,
	children: [],
	onChange: undefined,
};

export default Sortable;
