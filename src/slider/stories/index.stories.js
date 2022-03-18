/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import Slider from '../';
import DefaultWithState from './components/DefaultWithState';

export default {
	title: 'Components/Slider',
	component: Slider,
	decorators: [
		( Story ) => (
			<Wrapper>
				<Story />
			</Wrapper>
		),
	],
	parameters: {
		docs: {
			description: {
				component: 'Native scrolling list with paging and navigation controls.',
			},
		},
		controls: {
			hideNoControlsWarning: true,
		},
	},
};

export const _default = ( props ) => <DefaultWithState { ...props } />;
export const autoPlay = () => <DefaultWithState margin="20" length="8" autoPlay prevNextButtons pageDots />;
export const wrapAround = () => <DefaultWithState margin="20" length="3" wrapAround autoPlay prevNextButtons pageDots />;
export const freeScroll = () => <DefaultWithState margin="20" length="12" freeScroll prevNextButtons pageDots draggable />;

const Wrapper = styled.div`
	margin: auto;
	width: 80%;
`;

_default.argTypes = {
	autoPlay: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Autoplay',
	},
	draggable: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Draggable',
	},
	prevNextButtons: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Arrows',
	},
	pageDots: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Dots',
	},
	wrapAround: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Wrap around',
	},
	freeScroll: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Free scroll',
	},
	margin: {
		control: {
			max: 50,
			min: 0,
			step: 5,
			type: 'range',
		},
		defaultValue: 20,
		name: 'Margin',
		type: {
			name: 'number',
		},
	},
	friction: {
		control: {
			max: 1,
			min: 0,
			step: 0.01,
			type: 'range',
		},
		defaultValue: 0.15,
		name: 'Friction',
		type: {
			name: 'number',
		},
	},
	selectedAttraction: {
		control: {
			max: 1,
			min: 0,
			step: 0.01,
			type: 'range',
		},
		defaultValue: 0.01,
		name: 'Selected attraction',
		type: {
			name: 'number',
		},
	},
	freeScrollFriction: {
		control: {
			max: 1,
			min: 0,
			step: 0.01,
			type: 'range',
		},
		defaultValue: 0.03,
		name: 'Free scroll friction',
		type: {
			name: 'number',
		},
	},
	length: {
		control: {
			max: 12,
			min: 1,
			step: 1,
			type: 'range',
		},
		defaultValue: 6,
		name: 'Items',
		type: {
			name: 'number',
		},
	},
};
