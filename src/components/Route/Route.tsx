import { ReactNode } from 'react';
import { Routes } from '@/types/types';
import './Route.scss';
import { useAppSelector } from '@/store/hooks';
import { selectPage } from '@/store/menuSlice';

function Route({ route, component }: { route: Routes; component: ReactNode }) {
  const page = useAppSelector(selectPage);

  if (route !== page) {
    return null;
  }

  return <div className="route w-100 h-100 active">{component}</div>;
}

export default Route;
