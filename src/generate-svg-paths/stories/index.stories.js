/**
 * External dependencies
 */
import { size } from 'lodash';
import { number } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import GenerateSvgPaths from '../';
import DefaultWithState from './default';
import * as icons from '@sixach/icon-library';

export default {
	title: 'Components/SVG Paths',
	component: GenerateSvgPaths,
	parameters: {
		docs: {
			description: {
				component: 'Allows to render a raw SVG graphic without any initial styling.',
			},
		},
	},
};

export const _default = () => {
	const length = number( 'Icons', 10, { min: 1, step: 1, max: size( icons ), range: true } );
	const sizes = number( 'Size', 50, { min: 25, step: 5, max: 120, range: true } );
	return <DefaultWithState length={ length } size={ sizes } icons={ icons } />;
};
