import { Route, Link } from 'react-router-dom';

import styles from './holdings.module.scss';

export function Holdings() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Holdings!</h1>

      <ul>
        <li>
          <Link to="/">holdings\src\lib\holdings root</Link>
        </li>
      </ul>
    </div>
  );
}

export default Holdings;
