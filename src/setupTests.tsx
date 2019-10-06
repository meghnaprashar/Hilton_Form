import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import "jest-styled-components";
import "jest-localstorage-mock";
import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import spies from "chai-spies";

configure({ adapter: new Adapter() });

const { JSDOM } = require("jsdom");
const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;
global.window = window;

chai.should();
chai.use(spies);
chai.use(chaiEnzyme());
