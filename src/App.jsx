import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import useHandleRoutes from "./routes/routes";
import { DataProvider } from './context/DataContext';
import { ChakraProvider, theme } from '@chakra-ui/react';

const queryClient = new QueryClient()

function App() {
  const {routes}=useHandleRoutes()
  return (
    <ChakraProvider theme={theme}>

    <QueryClientProvider client={queryClient}>
      <DataProvider>

   {routes}
      </DataProvider>
    </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
