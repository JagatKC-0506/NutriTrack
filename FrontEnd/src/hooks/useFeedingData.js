import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  getFeedingLogs,
  createFeedingLog,
  updateFeedingLog as updateFeedingLogApi,
  deleteFeedingLog as deleteFeedingLogApi,
} from '../api';

const LOCAL_KEY = 'feedingLogs';

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocal(logs) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(logs)); } catch (e) { console.debug(e); }
}

export function useFeedingData(selectedBaby) {
  const [feedingLogs, setFeedingLogs] = useState(loadLocal);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(true);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveLocal(feedingLogs);
  }, [feedingLogs]);

  // Sync a batch of local-only logs to the API
  const syncLocalLogs = useCallback(async (apiLogs) => {
    const localLogs = loadLocal();
    const apiIds = new Set(apiLogs.map(l => l.id));

    for (const local of localLogs) {
      if (!apiIds.has(local.id) && selectedBaby?.id) {
        try {
          const { id, time, ...data } = local;
          // Normalize old localStorage format to API schema
          if (data.type && !data.feeding_type) data.feeding_type = data.type;
          if (data.amount && !data.quantity) {
            data.quantity = data.amount;
            data.quantity_unit = 'oz';
          }
          delete data.type;
          delete data.amount;
          await createFeedingLog({ baby_id: selectedBaby.id, ...data });
        } catch (e) {
          console.warn('Sync failed for log', local.id, e.message);
        }
      }
    }
  }, [selectedBaby?.id]);

  // Fetch from API when selectedBaby changes
  useEffect(() => {
    if (!selectedBaby?.id) return;

    getFeedingLogs({ baby_id: selectedBaby.id })
      .then(async data => {
        const logs = data.logs || [];

        // Push any local-only logs to the API
        const localLogs = loadLocal();
        if (localLogs.length > logs.length) {
          await syncLocalLogs(logs);
          // Re-fetch after sync to get server-assigned IDs
          const updated = await getFeedingLogs({ baby_id: selectedBaby.id });
          const finalLogs = updated.logs || [];
          setFeedingLogs(finalLogs);
          setUsingLocal(false);
          saveLocal(finalLogs);
        } else {
          setFeedingLogs(logs);
          setUsingLocal(false);
          saveLocal(logs);
        }
      })
      .catch(err => {
        console.warn('API fetch failed, using localStorage:', err.message);
        setUsingLocal(true);
        setError(null);
      });
  }, [selectedBaby?.id, syncLocalLogs]);

  const todayLogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return feedingLogs
      .filter(log => {
        const logDate = log.date || (log.time ? new Date(log.time).toISOString().split('T')[0] : null);
        return logDate === today;
      })
      .sort((a, b) => {
        if (b.time && a.time) return b.time.localeCompare(a.time);
        return new Date(b.created_at || b.id) - new Date(a.created_at || a.id);
      });
  }, [feedingLogs]);

  const todayFeedings = todayLogs.length;

  const formulaTotal = useMemo(() => {
    const type = log => log.feeding_type || log.type;
    return todayLogs
      .filter(l => type(l) === 'formula')
      .reduce((sum, l) => sum + (parseFloat(l.quantity || l.amount) || 0), 0);
  }, [todayLogs]);

  const breastfeedingSessions = useMemo(() => {
    const type = log => log.feeding_type || log.type;
    return todayLogs.filter(l => type(l) === 'breast').length;
  }, [todayLogs]);

  const lastFeeding = useMemo(() => {
    if (feedingLogs.length === 0) return null;
    return [...feedingLogs].sort((a, b) => {
      const dateA = a.date ? new Date(`${a.date}T${a.time || '00:00'}`) : new Date(a.time || 0);
      const dateB = b.date ? new Date(`${b.date}T${b.time || '00:00'}`) : new Date(b.time || 0);
      return dateB - dateA;
    })[0];
  }, [feedingLogs]);

  const addLog = useCallback(async (log) => {
    const newLog = {
      id: Date.now(),
      time: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      ...log,
    };

    // Try API first
    if (selectedBaby?.id) {
      try {
        const apiLog = await createFeedingLog({ baby_id: selectedBaby.id, ...log });
        setFeedingLogs(prev => [apiLog, ...prev]);
        return apiLog;
      } catch (err) {
        console.warn('API create failed, saving locally:', err.message);
      }
    }

    // Fallback to local
    setFeedingLogs(prev => [newLog, ...prev]);
    setUsingLocal(true);
    return newLog;
  }, [selectedBaby?.id]);

  const deleteLog = useCallback(async (id) => {
    // Optimistic local delete
    setFeedingLogs(prev => prev.filter(l => l.id !== id));

    if (!usingLocal) {
      try {
        await deleteFeedingLogApi(id);
      } catch (err) {
        console.warn('API delete failed:', err.message);
        setUsingLocal(true);
      }
    }
  }, [usingLocal]);

  const updateLog = useCallback(async (id, updates) => {
    // Optimistic local update
    setFeedingLogs(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));

    if (!usingLocal) {
      try {
        const updated = await updateFeedingLogApi(id, updates);
        setFeedingLogs(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l));
      } catch (err) {
        console.warn('API update failed, updated locally:', err.message);
        setUsingLocal(true);
      }
    }
  }, [usingLocal]);

  return {
    feedingLogs,
    error,
    usingLocal,
    todayLogs,
    todayFeedings,
    formulaTotal,
    breastfeedingSessions,
    lastFeeding,
    addLog,
    deleteLog,
    updateLog,
  };
}
