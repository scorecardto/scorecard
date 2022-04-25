import { useContext, useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { useRouter } from 'next/router';

import RouterLoading from './RouterLoading';
import { AuthContext } from '@/lib/context/AuthContext';
import { auth } from '@/lib/firebase';

type IRouteGuardProps = {
  children: JSX.Element;
};

export const getRouteType = (
  route: string
): 'ABOUT' | 'APP' | 'UNDEFINED' | 'AUTH' => {
  const stdRoute = route.replace(/\/+$/, '');

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
    router
      .push(authState.auth.currentUser ? '/dashboard' : '/about')
      .then(() => {
        setChecked(true);
      });
  };

  const check = (currentUser: User | null) => {
    // // eslint-disable-next-line no-restricted-globals
    // const { href } = location;

    // if (new URL(href).searchParams.get('redirect') === 'router') {
    //   setChecked(true);
    //   return;
    // }

    const routeType = getRouteType(router.route);

    if (routeType === 'AUTH') {
      if (!currentUser) {
        setChecked(true);
        return;
      }
      goToDefault();
    } else if (routeType === 'UNDEFINED') {
      goToDefault();
    } else if (routeType === 'APP' && !currentUser) {
      router.push('/login').then(() => {
        setChecked(true);
      });
    } else if (routeType === 'ABOUT' && !!currentUser) {
      goToDefault();
    } else {
      setChecked(true);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      check(authState.auth.currentUser);
    } else {
      setMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.auth.currentUser]);

  useEffect(() => {
    return auth.onAuthStateChanged((e) => {
      check(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterLoading done={checked}>{children}</RouterLoading>;
}
