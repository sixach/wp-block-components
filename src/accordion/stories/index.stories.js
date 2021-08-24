/**
 * Internal dependencies
 */
import AccordionStory from '../';

export default {
	title: 'Components/Accordion',
	component: AccordionStory,
	parameters: {
		docs: {
			description: {
				component: 'Vertically collapsible content.',
			},
		},
	},
};

export const _default = ( args ) => {
	return <AccordionStory { ...args } />;
};

_default.args = {
	heading: 'Is this an accordion?',
	content: 'Yes, it is.',
	borderActive: true,
    borderColor: '#aa0000',
	borderThickness: 5,
    backgroundColor: '#fff',
	fontColor: '#000000',
	hasSchema: true,
};
