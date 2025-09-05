'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters: Record<string, unknown>) => void;
    va?: (command: string, eventName: string, parameters: Record<string, unknown>) => void;
  }
}

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', 'Web Vitals', {
      [metric.name]: metric.value,
      rating: metric.rating,
    });
  }

  // Log performance in development
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? '🟢' : metric.rating === 'needs-improvement' ? '🟡' : '🔴';
    console.log(`${color} [Web Vitals] ${metric.name}:`, metric.value.toFixed(2), `(${metric.rating})`);
  }
}

export function WebVitals() {
  useEffect(() => {
    try {
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onINP(sendToAnalytics);

      // Monitor resource loading performance
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        // Observe largest contentful paint candidates
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry & { element?: Element; size?: number };
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP Candidate:', lastEntry.element?.tagName, lastEntry.size, 'at', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Observe resource timing
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource') {
              const resourceEntry = entry as PerformanceResourceTiming;
              if (resourceEntry.initiatorType === 'img' && resourceEntry.duration > 1000) {
                console.warn('⚠️ Slow image:', resourceEntry.name, `${resourceEntry.duration.toFixed(0)}ms`);
              }
            }
          }
        });
        resourceObserver.observe({ type: 'resource', buffered: true });

        // Cleanup
        return () => {
          lcpObserver.disconnect();
          resourceObserver.disconnect();
        };
      }
    } catch (error) {
      console.error('Failed to initialize Web Vitals:', error);
    }
  }, []);

  return null;
}