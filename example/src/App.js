import React from 'react'
import ProfileEditingExample, { code as profileEditingExampleCode } from './ProfileEditingExample';
import { version } from 'use-patch/package.json';

/** @type {React.CSSProperties} */
const exampleStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '2em',
  margin: '2em',
  border: '2px solid lightgray',
};

/** @type {React.CSSProperties} */
const titleStyles = {
  width: '100%',
  textAlign: 'center',
};

/** @type {React.CSSProperties} */
const codeStyles = {
  flex: 1,
};

/** @type {React.CSSProperties} */
const previewStyles = {
  paddingLeft: '2em',
  borderLeft: '1px solid lightgray',
  width: '260px',
  overflow: 'auto',
};

/** @type {React.CSSProperties} */
const linkStyles = {
  color: '#444',
};

const githubExampleDirLink = 'https://github.com/termosa/use-patch/blob/master/example';

const Example = ({ title, code, path, children }) => (
  <div style={exampleStyles}>
    <h2 style={titleStyles}>
      <a href={`${githubExampleDirLink}${path}`} style={linkStyles}>Example: {title}</a>
    </h2>
    <pre style={codeStyles}>{code}</pre>
    <div style={previewStyles}>{children}</div>
  </div>
);

const App = () => (
  <React.Fragment>
    <h1 style={titleStyles}>use-patch@{version}</h1>
    <Example title="Profile Editing" code={profileEditingExampleCode} path="/src/ProfileEditingExample.js">
      <ProfileEditingExample />
    </Example>
  </React.Fragment>
);

export default App;