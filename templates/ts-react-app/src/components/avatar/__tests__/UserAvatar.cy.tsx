import UserAvatar from '../UserAvatar'

/**
 * Test suite for the UserAvatar component.
 */
describe('<UserAvatar />', () => {
  /**
   * Test case to verify that the UserAvatar component renders correctly.
   */
  it('renders', () => {
    cy.mount(<UserAvatar />)
  })
})