import { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { AuthContext } from '@/lib/context/AuthContext';

type IRouteGuardProps = {
  children: JSX.Element;
};

export const getRouteType = (
  route: string
): 'ABOUT' | 'APP' | 'UNDEFINED' | 'AUTH' => {
  const stdRoute = new URL(route).pathname.replace(/\/+$/, '');

  if (stdRoute === '/login') return 'AUTH';
  if (stdRoute.startsWith('/about')) return 'ABOUT';
  if (stdRoute.startsWith('/insights') || stdRoute === '/dashboard') {
    return 'APP';
  }
  return 'UNDEFINED';
};

export default function RouteGuard({ children }: IRouteGuardProps) {
  const [checked, setChecked] = useState(false);

  const authState = useContext(AuthContext);

  const router = useRouter();

  const goToDefault = () => {
    router.push(
      authState.auth.currentUser
        ? '/dashboard?redirect=router'
        : '/about?redirect=router'
    );
  };

  const check = () => {
    // eslint-disable-next-line no-restricted-globals
    const { href } = location;

    if (new URL(href).searchParams.get('redirect') === 'router') {
      setChecked(true);
      return;
    }
    const routeType = getRouteType(href);

    if (routeType === 'AUTH') {
      if (!authState.auth.currentUser) {
        setChecked(true);
        return;
      }
      goToDefault();
    } else if (routeType === 'UNDEFINED') {
      goToDefault();
    } else if (routeType === 'APP' && !authState.auth.currentUser) {
      router.push('/login?redirect=router');
    } else if (routeType === 'ABOUT' && !!authState.auth.currentUser) {
      goToDefault();
    } else {
      setChecked(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log('route was updated');
  }, [router.route]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.auth.currentUser, router.route]);

  useEffect(() => {
    console.log('user was updated');
  }, [authState.auth.currentUser]);

  return checked ? children : <></>;
}
