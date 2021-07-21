/**
 * External dependencies
 */
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

/**
 * WordPress dependencies
 */
import '@wordpress/components/build-style/style.css';
import 'glider-js/glider.min.css';

addDecorator( withA11y );
addDecorator( withKnobs );
