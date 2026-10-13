const PAYPAL_SDK_URL = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';

let paypalSdkPromise: Promise<void> | null = null;

export function loadPayPalSdk(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  if (window.PayPal?.Donation) {
    return Promise.resolve();
  }
  if (paypalSdkPromise) {
    return paypalSdkPromise;
  }
  paypalSdkPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PAYPAL_SDK_URL;
    script.charset = 'UTF-8';
    script.onload = () => resolve();
    script.onerror = () => {
      paypalSdkPromise = null;
      reject(new Error('Failed to load the PayPal donation SDK'));
    };
    document.body.appendChild(script);
  });
  return paypalSdkPromise;
}
