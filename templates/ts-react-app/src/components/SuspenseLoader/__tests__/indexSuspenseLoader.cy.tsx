import SuspenseLoader from '../index'

describe('<SuspenseLoader />', () => {
  it('renders', () => {
    cy.mount(<SuspenseLoader />)
  })

  it('renders with message', () => {
    cy.mount(<SuspenseLoader message={'Text'} />)
    cy.contains('Text')
  })
})