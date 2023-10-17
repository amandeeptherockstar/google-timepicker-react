export function subscribeEvent(
  eventName: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | undefined
): void {
  document.addEventListener(eventName, listener, options);
}

export function unsubscribeEvent(eventName: string, listener: () => void) {
  document.removeEventListener(eventName, listener);
}

export function publishEvent(
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: CustomEventInit<any> | undefined
) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}
