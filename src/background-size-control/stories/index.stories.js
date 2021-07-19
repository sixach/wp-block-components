/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { text, boolean } from '@storybook/addon-knobs';

/**
 * Internal dependencies
 */
import BackgroundSizeControl from '../';
import DefaultWithState from './default';

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
	parameters: {
		docs: {
			description: {
				component: 'UI controls that are designed to provide ability to adjust CSS background size properties.',
			},
		},
	},
};

export const _default = () => {
	const label = text( 'Label', 'Background Size' );
	const help = text( 'Help', 'X/Y coordinates to place the background image relative to the edges of the container.' );
	const allowReset = boolean( 'Allow reset', true );
	return <DefaultWithState label={ label } help={ help } allowReset={ allowReset } />;
};

const Wrapper = styled.div`
	max-width: 280px;
`;
