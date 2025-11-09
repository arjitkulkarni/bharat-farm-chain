/**
 * Offline Indicator Component
 * Shows connection status and pending sync count
 */

import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw, Cloud, CloudOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOfflineSync } from '@/hooks/useOfflineSync';

export const OfflineIndicator = () => {
  const { isOnline, isSyncing, pendingCount, manualSync } = useOfflineSync();

  return (
    <>
      {/* Connection Status Badge */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50"
          >
            <Badge
              variant="destructive"
              className="px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2"
            >
              <WifiOff className="h-4 w-4" />
              You're Offline
              {pendingCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {pendingCount} pending
                </span>
              )}
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Syncing Indicator */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50"
          >
            <Badge
              className="px-4 py-2 text-sm font-medium shadow-lg flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              Syncing data...
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Right Status Indicator */}
      <motion.div
        className="fixed bottom-20 right-4 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={isOnline ? 'outline' : 'destructive'}
            size="icon"
            className="rounded-full h-12 w-12 shadow-lg"
            onClick={manualSync}
            disabled={!isOnline || isSyncing}
            title={isOnline ? 'Connected - Click to sync' : 'Offline'}
          >
            {isSyncing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.div>
            ) : isOnline ? (
              <Cloud className="h-5 w-5 text-green-600" />
            ) : (
              <CloudOff className="h-5 w-5" />
            )}
          </Button>
        </motion.div>

        {/* Pending count badge */}
        {pendingCount > 0 && !isOnline && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <Badge className="rounded-full h-6 w-6 flex items-center justify-center p-0 bg-orange-600 text-white text-xs">
              {pendingCount}
            </Badge>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

