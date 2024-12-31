import { registerRootComponent } from 'expo';
import App from './App';

export default function Home() {
  return <App />;
}

registerRootComponent(Home);