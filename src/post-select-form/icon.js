/**
 * Sixa icon library.
 */
import { edit } from '@sixach/icon-library';

/**
 * Generates corresponding HTML `Path` elements which enables each shape to be drawn.
 */
import GenerateSvgPaths from '../generate-svg-paths';

export default <GenerateSvgPaths paths={ edit?.paths } withSvgWrapper />;
