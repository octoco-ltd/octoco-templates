import SuspenseLoader from '../index'

/**
 * Test suite for the <SuspenseLoader /> component.
 */
describe('<SuspenseLoader />', () => {
  /**
   * Test case to verify that the <SuspenseLoader /> component renders without any errors.
   */
  it('renders', () => {
    cy.mount(<SuspenseLoader />)
  })

  /**
   * Test case to verify that the <SuspenseLoader /> component renders with the provided message and the message is displayed correctly.
   */
  it('renders with message', () => {
    cy.mount(<SuspenseLoader message={'Text'} />)
    cy.contains('Text')
  })
})