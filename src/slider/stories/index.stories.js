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
export const multiple = () => <DefaultWithState gap="20" length="12" allowTouchMove navigation pagination slidesPerView={ 3 } />;
export const autoPlay = () => <DefaultWithState gap="20" length="8" autoplay navigation pagination />;
export const loop = () => <DefaultWithState gap="10" length="3" allowTouchMove loop autoplay navigation pagination />;
export const freeMode = () => <DefaultWithState gap="10" length="5" allowTouchMove freeMode navigation pagination />;

const Wrapper = styled.div`
	margin: auto;
	width: 80%;
`;

_default.argTypes = {
	autoplay: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Autoplay',
	},
	allowTouchMove: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Allow touch move',
	},
	navigation: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Navigation',
	},
	pagination: {
		control: {
			type: 'boolean',
		},
		defaultValue: false,
		name: 'Pagination',
	},
	spaceBetween: {
		control: {
			max: 200,
			min: 0,
			step: 5,
			type: 'range',
		},
		defaultValue: 50,
		name: 'Space between',
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
