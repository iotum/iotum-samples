import { useRef, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute();
  const container = useRef(null);
  const widget = useRef(null);

  const credentials = useSelector(state => state.credentials);

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const onSubmit = (event) => {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the form data
    const accessCode = event.target['accessCode'].value;

    console.log("render meeting widget");

    if (!accessCode) {
      console.log("Access code not set, widget will not be rendered.");
      return;
    }

    widget.current?.unload();

    const { domain, token, hostId } = credentials;
    widget.current = new Callbridge.Meeting(
      {
        domain,
        sso: {
          token,
          hostId
        },
        container: container.current,
      },
      accessCode,
      {
        skipJoin: true
      }
    );
  };

  useEffect(() => {
    return () => {
      widget.current?.unload();
    }
  }, []);

  return (
    <div className={styles.appContainer}>
      <form onSubmit={onSubmit} className={styles.startButton}>
        <div className={styles.accessCodeLabel}>Access Code:</div>
        <input
          type="text"
          name="accessCode"
          required
          autoFocus
          className={styles.accessCodeInput}
        />
        <button type="submit" className={styles.startMeetingButton}>Start Meeting</button>
      </form>
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div ref={container} className={styles.widgetContainer}></div>
    </div>
  );
};

export default App;