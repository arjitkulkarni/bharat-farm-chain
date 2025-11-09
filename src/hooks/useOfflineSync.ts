/**
 * Hook to manage offline/online status and data synchronization
 */

import { useState, useEffect } from 'react';
import { 
  getPendingActions, 
  deletePendingAction,
  getUnsyncedItems,
  markAsSynced,
  clearOldCache,
  initDB
} from '@/lib/offlineStorage';
import { toast } from 'sonner';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Update online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('🌐 Back online! Syncing your data...', {
        duration: 3000,
      });
      syncPendingData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('📡 You\'re offline. Changes will be saved locally.', {
        duration: 4000,
        description: 'Your data will sync automatically when you\'re back online.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize database on mount
    initDB().catch(console.error);

    // Load pending actions count
    updatePendingCount();

    // Clear old cache on mount
    clearOldCache().catch(console.error);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update pending actions count
  const updatePendingCount = async () => {
    try {
      const actions = await getPendingActions();
      setPendingCount(actions.length);
    } catch (error) {
      console.error('Failed to update pending count:', error);
    }
  };

  // Sync pending data when online
  const syncPendingData = async () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);

    try {
      // Get all pending actions
      const pendingActions = await getPendingActions();
      
      if (pendingActions.length === 0) {
        setIsSyncing(false);
        return;
      }

      console.log(`Syncing ${pendingActions.length} pending actions...`);

      // Process each pending action
      for (const action of pendingActions) {
        try {
          await processPendingAction(action);
          await deletePendingAction(action.id);
        } catch (error) {
          console.error(`Failed to process action ${action.id}:`, error);
          // Don't delete if sync failed - will retry next time
        }
      }

      // Sync unsynced items
      await syncUnsyncedItems();

      // Update count
      await updatePendingCount();

      toast.success('✅ All data synced successfully!', {
        duration: 3000,
      });

    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Failed to sync some data. Will retry later.', {
        duration: 3000,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Process a single pending action
  const processPendingAction = async (action: any) => {
    console.log(`Processing action: ${action.action}`, action.data);

    // In a real implementation, you would make API calls here
    // For now, we'll just simulate the sync
    
    switch (action.action) {
      case 'create_listing':
        // await api.createListing(action.data);
        console.log('Would create listing:', action.data);
        break;
      
      case 'update_listing':
        // await api.updateListing(action.data.id, action.data);
        console.log('Would update listing:', action.data);
        break;
      
      case 'delete_listing':
        // await api.deleteListing(action.data.id);
        console.log('Would delete listing:', action.data.id);
        break;
      
      case 'send_message':
        // await api.sendMessage(action.data);
        console.log('Would send message:', action.data);
        break;
      
      case 'create_transaction':
        // await api.createTransaction(action.data);
        console.log('Would create transaction:', action.data);
        break;
      
      default:
        console.warn('Unknown action type:', action.action);
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  // Sync unsynced items from stores
  const syncUnsyncedItems = async () => {
    const stores: Array<'listings' | 'transactions' | 'messages'> = [
      'listings',
      'transactions',
      'messages',
    ];

    for (const store of stores) {
      const items = await getUnsyncedItems(store);
      
      for (const item of items) {
        try {
          // In real implementation, sync with backend
          console.log(`Syncing ${store} item:`, item.data);
          
          // Mark as synced
          await markAsSynced(store, item.id);
        } catch (error) {
          console.error(`Failed to sync ${store} item:`, error);
        }
      }
    }
  };

  // Manual sync trigger
  const manualSync = () => {
    if (!isOnline) {
      toast.error('Cannot sync while offline', {
        description: 'Please check your internet connection.',
      });
      return;
    }
    syncPendingData();
  };

  return {
    isOnline,
    isSyncing,
    pendingCount,
    manualSync,
  };
};

