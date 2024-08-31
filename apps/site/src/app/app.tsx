// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OuterChrome } from '@avi/shared/components';
import styles from './app.module.scss';

export function App() {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3333/api');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <OuterChrome>
      <h1>Welcome to site!</h1>
      <button onClick={handleClick}>Click me</button>
    </OuterChrome>
  );
}

export default App;
