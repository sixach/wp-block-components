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
// export const single = () => <DefaultWithState gap="20" length="8" hasArrows hasDots />;
// export const multiple = () => <DefaultWithState gap="10" length="9" hasArrows hasDots slidesToShow={ 3 } />;
// export const fractional = () => <DefaultWithState gap="10" length="12" hasArrows hasDots slidesToShow={ 3.5 } />;

const Wrapper = styled.div`
	margin: auto;
	width: 80%;

	.glider-dots {
		margin-top: 15px;
	}
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
	gap: {
		control: {
			max: 50,
			min: 0,
			step: 5,
			type: 'range',
		},
		defaultValue: 20,
		name: 'Gap',
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
