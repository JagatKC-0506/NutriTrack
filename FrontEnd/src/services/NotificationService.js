/**
 * NOTIFICATION SERVICE
 * ====================
 * Handles notifications for vaccine reminders.
 * - On native devices (Capacitor): uses @capacitor/local-notifications
 *   (permission prompt, sound + vibration).
 * - In a regular browser: falls back to the web Notification API.
 */

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

const CHANNEL_ID = 'nutritrack-reminders';

export class NotificationService {
  static isNative() {
    return Capacitor.isNativePlatform();
  }

  static isSupported() {
    if (this.isNative()) return true;
    return 'Notification' in window;
  }

  static async getPermission() {
    if (!this.isNative()) {
      if (!this.isSupported()) return null;
      return Notification.permission;
    }
    try {
      const status = await LocalNotifications.checkPermissions();
      return status.display === 'granted' ? 'granted' : status.display === 'denied' ? 'denied' : 'default';
    } catch (error) {
      console.error('Error checking native notification permission:', error);
      return 'default';
    }
  }

  static async requestPermission() {
    if (!this.isNative()) {
      if (!this.isSupported()) {
        console.warn('Notifications not supported in this browser');
        return false;
      }
      if (Notification.permission === 'granted') return true;
      if (Notification.permission === 'denied') return false;
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }

    try {
      await LocalNotifications.createChannel({
        id: CHANNEL_ID,
        name: 'Reminders',
        description: 'Vaccine and health reminders',
        importance: 5,
        vibration: true,
        sound: 'default',
      });
    } catch (error) {
      console.error('Error creating notification channel:', error);
    }

    try {
      const status = await LocalNotifications.checkPermissions();
      if (status.display === 'granted') return true;
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Error requesting native notification permission:', error);
      return false;
    }
  }

  static async sendNotification(title, options = {}) {
    if (!this.isNative()) {
      if (!this.isSupported()) {
        console.warn('Notifications not supported');
        return null;
      }
      if (Notification.permission !== 'granted') {
        const granted = await this.requestPermission();
        if (!granted) return null;
      }

      const defaultOptions = {
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: 'vaccine-reminder',
        requireInteraction: true,
        vibrate: [200, 100, 200],
        ...options,
      };

      try {
        const notification = new Notification(title, defaultOptions);
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
        return notification;
      } catch (error) {
        console.error('Error sending notification:', error);
        return null;
      }
    }

    try {
      const status = await LocalNotifications.checkPermissions();
      if (status.display !== 'granted') {
        const granted = await this.requestPermission();
        if (!granted) return null;
      }

      const id = Math.floor(Date.now() / 1000) % 2147483647;
      const notification = {
        id,
        title,
        body: options.body || '',
        channelId: CHANNEL_ID,
        smallIcon: 'ic_launcher',
        vibration: true,
        sound: 'default',
        schedule: { at: new Date(Date.now() + 500) },
      };

      await LocalNotifications.schedule({ notifications: [notification] });
      return notification;
    } catch (error) {
      console.error('Error sending native notification:', error);
      return null;
    }
  }

  static async sendVaccineReminders(vaccines) {
    if (!vaccines || vaccines.length === 0) return;

    const permission = await this.getPermission();
    if (permission !== 'granted') {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    if (vaccines.length === 1) {
      const vaccine = vaccines[0];
      const daysLeft = this.calculateDaysRemaining(vaccine.dueDate);
      await this.sendNotification(
        `💉 ${vaccine.name} - URGENT REMINDER`,
        {
          body: `Due in ${daysLeft} days for ${vaccine.forPerson}. Please schedule your appointment.`,
          tag: `vaccine-${vaccine.id}`,
        }
      );
    } else {
      const dueCount = vaccines.length;
      const vaccineNames = vaccines.slice(0, 2).map(v => v.name).join(', ');
      const moreText = dueCount > 2 ? ` and ${dueCount - 2} more` : '';

      await this.sendNotification(
        `🔔 ${dueCount} Vaccine Reminders - URGENT`,
        {
          body: `${vaccineNames}${moreText} are due within 7 days. Please check your schedule.`,
          tag: 'vaccine-batch',
        }
      );
    }
  }

  static calculateDaysRemaining(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);

    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return Math.max(daysRemaining, 0);
  }

  static isDueWithinWeek(dateString) {
    const daysRemaining = this.calculateDaysRemaining(dateString);
    return daysRemaining > 0 && daysRemaining <= 7;
  }

  static async initialize() {
    if (!this.isNative()) {
      if (!this.isSupported()) {
        console.warn('Notifications not supported in this browser');
        return false;
      }
      return Notification.permission === 'granted';
    }

    try {
      const status = await LocalNotifications.checkPermissions();
      return status.display === 'granted';
    } catch (error) {
      console.error('Error checking native notification permission:', error);
      return false;
    }
  }
}

export default NotificationService;
