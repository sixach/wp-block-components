/**
 * External dependencies
 */
import size from 'lodash/size';
import * as icons from '@sixa/icon-library';

/**
 * Internal dependencies
 */
import GenerateSvgPaths from '../';
import DefaultWithState from './components/DefaultWithState';

export default {
	title: 'Components/SVG Paths',
	component: GenerateSvgPaths,
	argTypes: {
		attributes: {
			table: {
				disable: true,
			},
		},
		length: {
			control: {
				max: size( icons ),
				min: 1,
				step: 1,
				type: 'range',
			},
			defaultValue: 10,
			name: 'Number of icons',
			type: {
				name: 'number',
			},
		},
		paths: {
			table: {
				disable: true,
			},
		},
		size: {
			control: {
				min: 25,
				max: 120,
				step: 5,
				type: 'range',
			},
			defaultValue: 60,
			name: 'Size',
			type: {
				name: 'number',
			},
		},
		svgProps: {
			table: {
				disable: true,
			},
		},
		withSvgWrapper: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'Allows to render a raw SVG graphic without any initial styling.',
			},
		},
	},
};

export const _default = ( props ) => <DefaultWithState icons={ icons } { ...props } />;
