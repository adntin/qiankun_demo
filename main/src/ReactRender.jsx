import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 渲染子应用
 */
function Render(props) {
  const { loading } = props;
  return (
    <>
      {loading && <h4 className="subapp-loading">Loading...</h4>}
      <div id="subapp-viewport" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('subapp-container'));
export default function render({ loading }) {
  root.render(
    <React.StrictMode>
      <Render loading={loading} />
    </React.StrictMode>,
  );
}
