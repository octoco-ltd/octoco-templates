import { Provider } from 'react-redux';
import store from '../src/store/store'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from '../src/context/SidebarContext';
import { ThemeProviderWrapper} from '../src/features/appTheme';

export const decorators = [
  (Story) => (

    <Provider store={store}>
     <HelmetProvider>
       <SidebarProvider>
       <BrowserRouter initialEntries={['/']}>
            <ThemeProviderWrapper>
              {Story()}
            </ThemeProviderWrapper>
          </BrowserRouter>
       </SidebarProvider>
     </HelmetProvider>
     </Provider>

  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}