import { expect } from 'chai'
import { shallow } from 'enzyme'
import APP from '../../components/APP'

describe('<APP /> Component', () => {

    let wrapper

    describe('Placeholder Rendering', () => {
        before(() => wrapper = shallow(<APP />))
        it('renders placeholder', () => expect(wrapper.find('h1').text()).to.equal('Cyber Chat'))
    })

})