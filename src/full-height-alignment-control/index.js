/* eslint-disable @wordpress/no-unsafe-wp-apis, import/named */

/**
 * Collection of block editor components, hooks, layouts, stores, and utilities to be used
 * for building custom editor blocks and components.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { __experimentalBlockFullHeightAligmentToolbar, __experimentalBlockFullHeightAligmentControl } from '@wordpress/block-editor';

/**
 * Full Height Alignment Control from `@wordpress/block-editor`.
 *
 * The component exported in this library is used as a means of backwards compatibility and to simplify maintenance
 * in a single interface.
 * It is possible that the packages being enqueued by WordPress differ from the packages being used during development.
 * Particularly, packages like `@wordpress/block-editor` work differently on different WordPress versions.
 *
 * @since 1.4.0
 * @example
 *
 * const { isFullHeight } = attributes;
 * <FullHeightAlignmentControl
 *     isActive={ !! isFullHeight }
 *     onToggle={ () => setAttributes( { isFullHeight: ! isFullHeight } ) }
 * />
 */
const FullHeightAlignmentControl = __experimentalBlockFullHeightAligmentToolbar || __experimentalBlockFullHeightAligmentControl;

export default FullHeightAlignmentControl;
