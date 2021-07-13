/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { number, boolean } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import Slider from '../';
import DefaultWithState from './default';

const GAP_CONFIG = { min: 0, step: 5, max: 50, range: true };
const LENGTH_CONFIG = { min: 1, step: 1, max: 12, range: true };

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
	},
};

export const _default = () => {
	const gap = number( 'Gap', 20, GAP_CONFIG );
	const length = number( 'Items', 6, LENGTH_CONFIG );
	const draggable = boolean( 'Draggable', false );
	const arrows = boolean( 'Arrows', false );
	const dots = boolean( 'Dots', false );
	const rewind = boolean( 'Rewind', false );
	return <DefaultWithState gap={ gap } length={ length } draggable={ draggable } rewind={ rewind } hasArrows={ arrows } hasDots={ dots } />;
};

export const single = () => {
	return <DefaultWithState gap="20" length="8" hasArrows={ true } hasDots={ true } />;
};

export const multiple = () => {
	return <DefaultWithState gap="10" length="9" hasArrows={ true } hasDots={ true } slidesToShow={ 3 } />;
};

export const fractional = () => {
	return <DefaultWithState gap="10" length="12" hasArrows={ true } hasDots={ true } slidesToShow={ 3.5 } />;
};

const Wrapper = styled.div`
	width: 80%;
	margin: auto;

	.glider-dots {
		margin-top: 15px;
	}
`;
