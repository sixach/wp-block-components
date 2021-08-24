/**
 * Schema object to be used as HTML attributes on the Accordion Item markup.
 * Schema markup helps your website rank better for all kinds of content types.
 *
 * @see    https://schema.org
 */
 const schema = {
	question: {
		itemScope: 'itemscope',
		itemProp: 'mainEntity',
		itemType: 'https://schema.org/Question',
	},
	name: {
		itemProp: 'name',
	},
	answer: {
		itemScope: 'itemscope',
		itemProp: 'acceptedAnswer',
		itemType: 'https://schema.org/Answer',
	},
	text: {
		itemProp: 'text',
	},
};

export default schema;