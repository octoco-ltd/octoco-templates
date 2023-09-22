import UserAvatar from '../UserAvatar'

describe('<UserAvatar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserAvatar />)
  })
})