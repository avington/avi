import { useParams } from 'react-router-dom';
import styles from './positions-view.module.scss';
import { ViewContainer } from '@avi/client-components';
import PositionsTopMenu from '../../components/positions/positions-top-menu/positions-top-menu';
import PositionsSummary from '../../components/positions/positions-summary/positions-summary';

export function PositionsView() {
  const { portfolioId } = useParams();
  console.log(portfolioId);
  return (
    <ViewContainer className={styles['container']} style={{ paddingTop: '1rem' }}>
      <div>
        <PositionsTopMenu portfolioId={portfolioId ?? ''} />
      </div>
      <div>
        <PositionsSummary />
      </div>
      <div>positions table</div>
    </ViewContainer>
  );
}

export default PositionsView;
