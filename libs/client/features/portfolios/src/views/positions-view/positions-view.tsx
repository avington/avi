import { useParams } from 'react-router-dom';
import styles from './positions-view.module.scss';
import { ViewContainer } from '@avi/client-components';
import PositionsTopMenu from '../../components/positions/positions-top-menu/positions-top-menu';
import PositionsSummary from '../../components/positions/positions-summary/positions-summary';
import PositionsTableContainer from '../../components/positions/positions-table-container/positions-table-container';

export function PositionsView() {
  const { portfolioId } = useParams();

  return (
    <ViewContainer className={styles['container']} style={{ paddingTop: '1rem' }}>
      <div>
        <PositionsTopMenu portfolioId={portfolioId ?? ''} />
      </div>
      <div>
        <PositionsSummary />
      </div>
      <div>
        <PositionsTableContainer />
      </div>
    </ViewContainer>
  );
}

export default PositionsView;
