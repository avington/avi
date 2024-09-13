import { useParams } from 'react-router-dom';
import styles from './positions-view.module.scss';

export function PositionsView() {
  const { portfolioId } = useParams();
  console.log(portfolioId);
  return (
    <div className={styles['container']}>
      <h1>Welcome to PositionsView!</h1>
    </div>
  );
}

export default PositionsView;
