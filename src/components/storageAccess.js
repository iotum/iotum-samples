const HINTS = {
  request: 'Click the button in the widget to allow cookies.',
  interaction: 'Allow the pop-up window, then click the button in it.',
  retry: 'Click the button in the widget again to continue.',
};

export const STORAGE_ACCESS_DENIED_MESSAGE = 'Unable to sign in without cookie access.';

/**
 * Third-party cookies are blocked in some browsers (e.g. Safari), so the widget needs the user
 * to click inside it. Widgets that are normally hidden must be shown until the user is done.
 *
 * @param {import('@iotum/callbridge-js').Widget} widget
 * @param {object} handlers
 * @param {(hint: string, step: string) => void} handlers.onRequired show the widget and the hint
 * @param {(denied: boolean) => void} handlers.onSettled restore the layout; may be called more than once
 */
export const handleStorageAccess = (widget, { onRequired, onSettled }) => {
  widget.on('widget.STORAGE_ACCESS_REQUIRED', ({ step }) => onRequired(HINTS[step] || HINTS.request, step));
  widget.on('widget.STORAGE_ACCESS_GRANTED', () => onSettled(false));
  widget.on('widget.STORAGE_ACCESS_DENIED', () => onSettled(true));
  widget.on('widget.ERROR', () => onSettled(false));
};
