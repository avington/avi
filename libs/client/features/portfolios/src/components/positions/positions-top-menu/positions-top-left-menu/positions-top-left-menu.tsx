import { BreadcrumbDropdown, BreadcrumbLink, RenderWhen } from '@avi/client-components';
import styles from './positions-top-left-menu.module.scss';
import { Portfolio } from '@avi/global/models';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface PositionsTopLeftMenuProps {
  loading: boolean;
  portfolioId: string;
  portfolios: Portfolio[] | null;
}

export function PositionsTopLeftMenu({ loading, portfolioId, portfolios }: PositionsTopLeftMenuProps) {
  const navigate = useNavigate();
  const navigateToPortfolio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`/positions/${e.target.value}`);
  };

  return (
    <RenderWhen>
      <RenderWhen.If isTrue={loading}>
        <Skeleton variant="text" width={100} />
      </RenderWhen.If>
      <RenderWhen.If isTrue={!loading}>
        <div className={styles['container']}>
          <BreadcrumbLink to="/portfolios">Portfolios</BreadcrumbLink>
          <span className="pd-left-5 pd-right-5">/</span>
          <BreadcrumbDropdown value={portfolioId} onChange={navigateToPortfolio}>
            {portfolios?.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </option>
            ))}
          </BreadcrumbDropdown>
        </div>
      </RenderWhen.If>
    </RenderWhen>
  );
}

export default PositionsTopLeftMenu;
