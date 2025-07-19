

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const Success = () => {
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');

    if (session_id) {
      axios.get(`${process.env.REACT_APP_API}/api/payment/verify-session?session_id=${session_id}`)
        .then(res => {
          const token = res.data.token;
          setDownloadLink(`${process.env.REACT_APP_API}/api/download/${token}`);
        })
        .catch(() => {
          alert('Payment could not be verified.');
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="success-container">
      <h2>✅ Payment Successful!</h2>
      {loading ? (
        <p>Verifying session...</p>
      ) : (
        downloadLink && (
          <a href={downloadLink} className="download-btn">
            Download Your Resume
          </a>
        )
      )}
    </div>
  );
};

export default Success;
