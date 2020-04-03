import React, { useState, useEffect } from 'react'
import Layout from 'common/Layout'

const Home = (props) => {
  const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI || window.exports.JitsiMeetExternalAPI; 
  const [loading, setLoading] = useState(true);
  const containerStyle = {
    width: '100%',
    height: '800px',
  };

  const jitsiContainerStyle = {
    display: (loading ? 'none' : 'block'),
    width: '100%',
    height: '100%',
  }

  function startConference() {
    try {
    //  const domain = '35.208.134.182';
    //  const domain = 'meet.jit.si';
     const domain = 'jitsi-sys-demo.tk';
     const options = {
      roomName: 'systango-jitsidemo',
      // roomName: 'roomName',
      height: 600,
      parentNode: document.getElementById('jitsi-container'),
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        JITSI_WATERMARK_LINK: 'https://timesheet.systangostudios.com/static/img/logo.svg',
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
      },
      configOverwrite: {
       disableSimulcast: false,
       startWithVideoMuted: true,
       constraints: {
            video: {
                aspectRatio: 16 / 9,
                height: {
                    ideal: 720,
                    max: 720,
                    min: 240
                }
            }
        },
    
      },
     };
  
     const api = new JitsiMeetExternalAPI(domain, options);
     api.addEventListener('videoConferenceJoined', () => {
      console.log('Local User Joined');
      setLoading(false);
      api.executeCommand('displayName', 'MyName');
     });
    } catch (error) {
     console.error('Failed to load Jitsi API', error);
    }
   }
  
   useEffect(() => {
    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI) startConference();
    else alert('Jitsi Meet API script not loaded');
   }, []);

  return (
    <Layout>
       <div
        style={containerStyle}
        >
        	{loading && <p>Loading</p>}
        <div
          id="jitsi-container"
          style={jitsiContainerStyle}
        />
        </div>
    </Layout>
  )
}

Home.propTypes = {
}

export default Home
