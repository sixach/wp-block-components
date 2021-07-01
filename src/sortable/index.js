/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { map } from 'lodash';

/**
 * Runtime type checking for React props and similar objects.
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * Utility for conditionally joining CSS class names together.
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * Move an array item to a different position.
 *
 * @see     https://github.com/sindresorhus/array-move
 * @ignore
 */
import arrayMove from 'array-move';

/**
 * A React component to sort items in lists or grids.
 *
 * @see		https://github.com/ricardo-ch/react-easy-sort
 * @ignore
 */
import SortableList, { SortableItem } from 'react-easy-sort';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 * @ignore
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Sortable component designed to provide the ability to provide a set of higher-order components
 * to turn any collection of elements given into an accessible and touch-friendly sortable list.
 *
 * @function
 * @since	   1.2.0
 * @param	   {Object}		    props                         The props that were defined by the caller of this component.
 * @param      {string}         props.className               The CSS class name(s) that will be added to the wrapper element.
 * @param      {string}         props.draggedItemClassName    The CSS class name(s) that will be added to the item being dragged.
 * @param  	   {JSX.Element} 	props.children             	  Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param	   {Function}		props.onChange 			      Callback function to be triggered when the user finishes a sorting gesture.
 * @return	   {JSX.Element}        					      Sortable list component.
 * @example
 *
 * <Sortable
 * 		onChange={ ( value ) => setAttributes( { items: value } ) }
 * >
 * 		{ map( items, ( { value, label }, index ) => (
 *			<StyledTag key={ value } label={ label } value={ value } onRemove={ () => onRemove( index ) } />
 *		) ) }
 * </Sortable>
 */
function Sortable( { className, draggedItemClassName, children, onChange } ) {
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
					<div className="sixa-component-sortable__item">{ item }</div>
				</SortableItem>
			) ) }
		</SortableList>
	);
}

Sortable.propTypes = {
	className: PropTypes.string,
	draggedItemClassName: PropTypes.string,
	children: PropTypes.element.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default Sortable;
