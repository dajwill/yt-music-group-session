import { Provider } from '@/components/ui/provider';
import SearchBar from './components/SearchBar';
import AudioPlayer from './components/AudioPlayer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Route, Switch } from 'wouter'
import Search from './pages/Search';
import Queue from './pages/Queue';
import QueueProvider from './state/QueueProvider';

const src =
  "https://dts.podtrac.com/redirect.mp3/cdn.simplecast.com/audio/2ac34c/2ac34cab-4949-40aa-bac7-d7e3a70f0a39/a5c37519-9a29-464b-8008-b9aae32c0cd4/podcast_joel_with_veni_kunche_v1_mp3_tc.mp3";

function App() {
const queryClient = new QueryClient()

return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <QueueProvider>
          <SearchBar />
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/queue" component={Queue} />
            <Route path="/" component={Queue} />
            <Redirect to='/' />
          </Switch>
          <AudioPlayer src={src} />
        </QueueProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
