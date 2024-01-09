import React, { useRef, useEffect, useState } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const renderWidget = ({ domain, token, hostId, accessCode, muteMic, muteCam }) => {
  const _widget = new Callbridge.Meeting(
    {
      domain,
      sso: {
        token,
        hostId
      },
      container: '#meeting',
    },
    accessCode,
    {
      skipJoin: true,
      mute: {
        mic: muteMic,
        camera: muteCam,
      }
    }
  );

  document.querySelector('#start').disabled = true;
  _widget.on('room.READY', () => {
    document.querySelector('#start').disabled = false;
  });

  _widget.on('device.DEVICE_LIST_CHANGED', (devices) => {
    ['audioinput', 'audiooutput', 'videoinput'].forEach((kind) => {
      /** @type {HTMLSelectElement} */
      const select = document.querySelector(`select#${kind}`);
      select.replaceChildren(select.firstChild);

      devices[kind].forEach(({ label, deviceId }) => {
        select.appendChild(
          Object.assign(
            document.createElement('option'),
            {
              textContent: label,
              value: deviceId,
            }
          )
        )
      });
    })
  });

  _widget.on('device.DEVICE_IN_USE', ({ kind, deviceId }) => {
    /** @type {HTMLSelectElement} */
    const select = document.querySelector(`select#${kind}`);
    select.value = deviceId;
  });

  return _widget;
};

const App = () => {
  useGuardedRoute();

  const [isCameraOn, setCameraOn] = useState(/** @return {boolean} */() => { });
  const [isMuted, setMuted] = useState(/** @return {boolean} */() => { });

  /** @type {React.MutableRefObject<Callbridge.Meeting>} */
  const widget = useRef();

  const credentials = useSelector(state => state.credentials);

  /** @type {React.ChangeEventHandler<HTMLSelectElement>} */
  const onDeviceChange = ({ target: select }) => {
    switch (select.id) {
      case 'videoinput':
        widget.current.setVideoInput(select.value);
        break;
      case 'audioinput':
        widget.current.setAudioInput(select.value);
        break;
      case 'audiooutput':
        widget.current.setAudioOutput(select.value);
        break;
      default:
        console.error('invalid', select.id);
        break;
    }
  };

  const onToggleMic = () => {
    widget.current.setMute(!isMuted);
  };
  const onToggleCam = () => {
    widget.current.setCamera(!isCameraOn);
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const onSubmit = (evt) => {
    // Prevent the browser from reloading the page
    evt.preventDefault();

    // Read the form data
    const accessCode = evt.target['accessCode'].value;
    if (!accessCode) {
      console.log("Access code not set, widget will not be rendered.");
      return;
    }

    widget.current?.unload();
    widget.current = renderWidget({
      ...credentials,
      accessCode,
      muteMic: !evt.target['joinMic'].checked,
      muteCam: !evt.target['joinCam'].checked,
    });

    widget.current.on('participant.CHANGE', ({ isCameraOn, isMuted }) => {
      setCameraOn(isCameraOn);
      setMuted(isMuted);
    });
  };

  useEffect(() => {
    return () => {
      widget.current?.unload();
    }
  }, []);

  return (
    <div className={styles.appContainer}>
      <form onSubmit={onSubmit}>
        <label><span>Access Code:</span>
          <input
            name="accessCode"
            type="text"
            required
            autoFocus
            className={styles.accessCodeInput}
          />
        </label>
        <label title='join with microphone on'>
          <input name="joinMic" type="checkbox" defaultChecked={true} />
          <span>mic</span>
        </label>
        <label title='join with camera on'>
          <input name="joinCam" type="checkbox" defaultChecked={true} />
          <span>cam</span>
        </label>
        <button id="start" type="submit" className={styles.startMeetingButton}>Start Meeting</button>
      </form>
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div className={styles.devices}>
        <select id="audioinput" onChange={onDeviceChange}><option disabled value="">audio input ...</option></select>
        <select id="audiooutput" onChange={onDeviceChange}><option disabled value="">audio output ...</option></select>
        <select id="videoinput" onChange={onDeviceChange}><option disabled value="">video input ...</option></select>
        {isMuted !== undefined && <button id="toggleMic" type="button" onClick={onToggleMic}>{isMuted ? 'UNMUTE' : 'MUTE'} mic</button>}
        {isCameraOn !== undefined && <button id="toggleCam" type="button" onClick={onToggleCam}>{isCameraOn ? 'START' : 'STOP'} cam</button>}
      </div>
      <div id="meeting" className={styles.widgetContainer}></div>
    </div>
  );
};

export default App;