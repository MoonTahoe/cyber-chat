import { expect } from 'chai'
import { shallow } from 'enzyme'
import APP from '../../components/APP'

describe('react components', () => {

    let wrapper

    describe('<APP /> "Placeholder" Component', () => {
        before(() => wrapper = shallow(<APP />))
        it('renders placeholder', () => expect(wrapper.find('h1').text()).to.equal('Cyber Chat'))
    })

})

