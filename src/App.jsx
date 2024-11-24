import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import useHandleRoutes from "./routes/routes";
import { DataProvider } from './context/DataContext';

const queryClient = new QueryClient()

function App() {
  const {routes}=useHandleRoutes()
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>

   {routes}
      </DataProvider>
    </QueryClientProvider>
  )
}

export default App
