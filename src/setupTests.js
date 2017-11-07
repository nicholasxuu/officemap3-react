/**
 * Setup enzyme adapter
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#srcsetuptestsjs
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
