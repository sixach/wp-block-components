/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import BackgroundSizeControl from '../';
import DefaultWithState from './components/DefaultWithState';

export default {
	title: 'Components/Background Sizes',
	component: BackgroundSizeControl,
	decorators: [
		( Story ) => (
			<Wrapper>
				<Story />
			</Wrapper>
		),
	],
	argTypes: {
		className: {
			table: {
				disable: true,
			},
		},
		hideLabelFromVision: {
			table: {
				disable: true,
			},
		},
		onChange: {
			table: {
				disable: true,
			},
		},
		sizes: {
			table: {
				disable: true,
			},
		},
		value: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'UI controls that are designed to provide ability to adjust CSS background size properties.',
			},
		},
	},
};

export const _default = ( props ) => {
	return <DefaultWithState { ...props } />;
};

const Wrapper = styled.div`
	max-width: 280px;
`;

_default.args = {
	allowReset: true,
	help: 'X/Y coordinates to place the background image relative to the edges of the container.',
	label: 'Background Size',
};
