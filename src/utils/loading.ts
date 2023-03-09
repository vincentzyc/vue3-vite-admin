import { ElLoading } from 'element-plus';

export function openLoading(text?: string): void {
  window.fullLoading = ElLoading.service({
    lock: true,
    text: text,
    background: 'rgba(0, 0, 0, 0.66)',
  });
}

export function closeLoading(): void {
  if (window.fullLoading) window.fullLoading.close();
}

export default {
  open: openLoading,
  close: closeLoading,
};
