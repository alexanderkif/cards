import { Routes } from '@/types/types';
import './Route.scss';
import { useAppSelector } from '@/store/hooks';
import { selectPage } from '@/store/menuSlice';

function Route({
  route,
  component,
}: {
  route: Routes;
  component: JSX.Element;
}) {
  const page = useAppSelector(selectPage);

  return (
    <div className={`route ${route === page ? 'active' : ''}`}>{component}</div>
  );
}

export default Route;
