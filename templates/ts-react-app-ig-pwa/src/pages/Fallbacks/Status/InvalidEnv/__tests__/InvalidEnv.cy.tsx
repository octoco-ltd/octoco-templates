import StatusFailure from '../InvalidEnv';

describe('<InvalidEnv />', () => {
  it('renders', () => {
    cy.mount(
      <StatusFailure />
    )
  })
})