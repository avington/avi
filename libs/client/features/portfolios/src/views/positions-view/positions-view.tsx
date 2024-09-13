import { useParams } from 'react-router-dom';
import styles from './positions-view.module.scss';
import { ViewContainer } from '@avi/client-components';
import PositionsTopMenu from '../../components/positions/positions-top-menu/positions-top-menu';

export function PositionsView() {
  const { portfolioId } = useParams();
  console.log(portfolioId);
  return (
    <ViewContainer className={styles['container']}>
      <div>
        <PositionsTopMenu portfolioId={portfolioId ?? ''} />
      </div>
      <div>3 panel summary</div>
      <div>positions table</div>
    </ViewContainer>
  );
}

export default PositionsView;
