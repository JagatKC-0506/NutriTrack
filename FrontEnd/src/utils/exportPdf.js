/**
 * PDF EXPORT HELPER
 * =================
 * On native devices (Capacitor), jsPDF's doc.save() relies on browser
 * downloads which Android WebView blocks. Instead we write the PDF to
 * the app cache and open the system share sheet.
 * In a regular browser, fall back to doc.save().
 */

import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function saveOrSharePdf(doc, filename) {
  if (Capacitor.isNativePlatform()) {
    try {
      const blob = doc.output('blob');
      const base64 = await blobToBase64(blob);
      const saved = await Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Cache,
        recursive: true,
      });
      await Share.share({
        title: filename,
        url: saved.uri,
        dialogTitle: 'Save or share PDF',
      });
    } catch (error) {
      console.error('Native PDF export failed:', error);
      doc.save(filename);
    }
  } else {
    doc.save(filename);
  }
}
