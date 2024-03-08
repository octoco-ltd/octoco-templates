import CopyText from '../CopyText'

/**
 * Test suite for the CopyText component.
 */
describe('<CopyText />', () => {
  /**
   * Test case to check if the component renders successfully.
   */
  it('renders', () => {
    cy.mount(<CopyText>Text</CopyText>)
  })

  /**
   * Test case to check if the relevant child is rendered.
   */
  it('Renders the relevant child', () => {
    cy.mount(<CopyText>Text</CopyText>)
    cy.contains('Text')
  })

  // it('should copy text to clipboard and change tooltip text on button click', async () => {
  //   // Render the CopyText component with a test text
  //   const { getByTestId, getByTitle } = render(
  //     <CopyText>Test Text</CopyText>
  //   );

  //   // Find the Copy button and click it
  //   const copyButton = getByTestId('copy-icon');
  //   fireEvent.click(copyButton);

  //   // Wait for the tooltip text to change to "Copied!"
  //   await getByTitle('Copied!');

  //   // - Check if the clipboard contains the copied text
  //   const clipboardData = await navigator.clipboard.readText();
  //   expect(clipboardData).toBe('Test Text');
  // });
})
