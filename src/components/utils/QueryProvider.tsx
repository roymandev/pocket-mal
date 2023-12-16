import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import Config from 'Config';

import { createExpoSQLitePersister } from '@/utils/queryPersister';
import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  })
);
const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Config.enablePresistentQuery
        ? 1000 * 60 * 60 * 24 // 24 hours
        : 1000 * 60 * 5, // 5 minutes
    },
  },
});

const persister = createExpoSQLitePersister();

type Props = {
  children: JSX.Element;
};

function QueryProvider({ children }: Props) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  if (!Config.enablePresistentQuery)
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

export default QueryProvider;
