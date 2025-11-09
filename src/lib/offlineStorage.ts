/**
 * Offline Storage Service using IndexedDB
 * Provides offline data caching and synchronization
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define database schema
interface KisanConnectDB extends DBSchema {
  listings: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
  transactions: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
  messages: {
    key: string;
    value: {
      id: string;
      data: any;
      timestamp: number;
      synced: boolean;
    };
  };
  pendingActions: {
    key: string;
    value: {
      id: string;
      action: string;
      data: any;
      timestamp: number;
    };
  };
}

const DB_NAME = 'kisan-connect';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<KisanConnectDB> | null = null;

/**
 * Initialize database connection
 */
export const initDB = async (): Promise<IDBPDatabase<KisanConnectDB>> => {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<KisanConnectDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('listings')) {
        const listingsStore = db.createObjectStore('listings', { keyPath: 'id' });
        listingsStore.createIndex('timestamp', 'timestamp');
        listingsStore.createIndex('synced', 'synced');
      }

      if (!db.objectStoreNames.contains('transactions')) {
        const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' });
        transactionsStore.createIndex('timestamp', 'timestamp');
        transactionsStore.createIndex('synced', 'synced');
      }

      if (!db.objectStoreNames.contains('messages')) {
        const messagesStore = db.createObjectStore('messages', { keyPath: 'id' });
        messagesStore.createIndex('timestamp', 'timestamp');
        messagesStore.createIndex('synced', 'synced');
      }

      if (!db.objectStoreNames.contains('pendingActions')) {
        const pendingStore = db.createObjectStore('pendingActions', { keyPath: 'id' });
        pendingStore.createIndex('timestamp', 'timestamp');
      }
    },
  });

  return dbInstance;
};

/**
 * Save listing to offline storage
 */
export const saveListingOffline = async (listing: any): Promise<void> => {
  const db = await initDB();
  await db.put('listings', {
    id: listing.id,
    data: listing,
    timestamp: Date.now(),
    synced: false,
  });
};

/**
 * Get all listings from offline storage
 */
export const getOfflineListings = async (): Promise<any[]> => {
  const db = await initDB();
  const listings = await db.getAll('listings');
  return listings.map(item => item.data);
};

/**
 * Save transaction to offline storage
 */
export const saveTransactionOffline = async (transaction: any): Promise<void> => {
  const db = await initDB();
  await db.put('transactions', {
    id: transaction.id,
    data: transaction,
    timestamp: Date.now(),
    synced: false,
  });
};

/**
 * Queue action for later execution (when online)
 */
export const queueAction = async (action: string, data: any): Promise<void> => {
  const db = await initDB();
  const id = `${action}_${Date.now()}`;
  await db.put('pendingActions', {
    id,
    action,
    data,
    timestamp: Date.now(),
  });
  console.log(`Action queued: ${action}`, data);
};

/**
 * Get all pending actions
 */
export const getPendingActions = async (): Promise<any[]> => {
  const db = await initDB();
  return await db.getAll('pendingActions');
};

/**
 * Delete pending action after successful sync
 */
export const deletePendingAction = async (id: string): Promise<void> => {
  const db = await initDB();
  await db.delete('pendingActions', id);
};

/**
 * Mark item as synced
 */
export const markAsSynced = async (
  store: 'listings' | 'transactions' | 'messages',
  id: string
): Promise<void> => {
  const db = await initDB();
  const item = await db.get(store, id);
  if (item) {
    item.synced = true;
    await db.put(store, item);
  }
};

/**
 * Get unsynced items from a store
 */
export const getUnsyncedItems = async (
  store: 'listings' | 'transactions' | 'messages'
): Promise<any[]> => {
  const db = await initDB();
  const tx = db.transaction(store, 'readonly');
  const index = tx.store.index('synced');
  const items = await index.getAll(false);
  await tx.done;
  return items;
};

/**
 * Clear old cached data (older than 30 days)
 */
export const clearOldCache = async (): Promise<void> => {
  const db = await initDB();
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

  const stores: Array<'listings' | 'transactions' | 'messages'> = [
    'listings',
    'transactions',
    'messages',
  ];

  for (const storeName of stores) {
    const tx = db.transaction(storeName, 'readwrite');
    const index = tx.store.index('timestamp');
    let cursor = await index.openCursor();

    while (cursor) {
      if (cursor.value.timestamp < thirtyDaysAgo && cursor.value.synced) {
        await cursor.delete();
      }
      cursor = await cursor.continue();
    }

    await tx.done;
  }
};

/**
 * Get storage usage statistics
 */
export const getStorageStats = async (): Promise<{
  listings: number;
  transactions: number;
  messages: number;
  pendingActions: number;
}> => {
  const db = await initDB();

  const [listings, transactions, messages, pendingActions] = await Promise.all([
    db.count('listings'),
    db.count('transactions'),
    db.count('messages'),
    db.count('pendingActions'),
  ]);

  return {
    listings,
    transactions,
    messages,
    pendingActions,
  };
};

/**
 * Export all offline data (for debugging)
 */
export const exportOfflineData = async (): Promise<any> => {
  const db = await initDB();

  const [listings, transactions, messages, pendingActions] = await Promise.all([
    db.getAll('listings'),
    db.getAll('transactions'),
    db.getAll('messages'),
    db.getAll('pendingActions'),
  ]);

  return {
    listings,
    transactions,
    messages,
    pendingActions,
    exportedAt: new Date().toISOString(),
  };
};

/**
 * Clear all offline data
 */
export const clearAllOfflineData = async (): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(['listings', 'transactions', 'messages', 'pendingActions'], 'readwrite');
  
  await Promise.all([
    tx.objectStore('listings').clear(),
    tx.objectStore('transactions').clear(),
    tx.objectStore('messages').clear(),
    tx.objectStore('pendingActions').clear(),
  ]);
  
  await tx.done;
  console.log('All offline data cleared');
};

