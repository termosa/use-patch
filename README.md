# use-patch

> Track diff when changing objects

[![NPM](https://img.shields.io/npm/v/use-patch.svg)](https://www.npmjs.com/package/use-patch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-patch
```

## Usage

```tsx
import * as React from 'react'

import usePatch from 'use-patch'
// Or: import { usePatch } from 'use-patch'

const Example = () => {
  const {
    diff,    // The list of properties that are different from the origin object
    value,   // The origin object with patches applied to it
    changed, // Boolean value that shows if diff contains changes
    apply,   // Function that adds changes to the origin object
    set,     // Function that defines the resulting object (the diff will be calculated from the origin and given object)
    reset,   // Function that resets all changes
  } = usePatch(
    origin, // The origin object to be compared with stored changes
  );

  // ...
};
```

## Examples

### Using it to track changed properties of the profile

[Source code](https://github.com/termosa/use-patch/blob/master/example/src/ProfileEditingExample.js)

```tsx
const ProfileEditingExample = () => {
  const profile = { firstName: "Jeff", lastName: "Adams" };
  const profilePatch = usePatch(profile);

  return (
    <div>
      <h3>Origin</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <form>
        <h3>Editor</h3>
        <div>
          <label>
            First name
            <input
              value={profilePatch.value.firstName}
              onChange={(e) =>
                profilePatch.apply({ firstName: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Last name
            <input
              value={profilePatch.value.lastName}
              onChange={(e) => profilePatch.apply({ lastName: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Age
            <input
              value={profilePatch.value.age || ""}
              onChange={(e) =>
                profilePatch.apply({ age: +e.target.value || undefined })
              }
            />
          </label>
        </div>
      </form>
      <h3>The diff</h3>
      <pre>{JSON.stringify(profilePatch.diff, null, 2)}</pre>
    </div>
  );
};
```

### Example of collecting data for PUT request

```tsx
import api from './api';

const ProfilePage = ({ profile }) => {
  const profilePatch = usePatch(profile);

  return (
    <ProfileForm
      defaultValue={profile}
      onProfileChange={profilePatch.set}
      onSubmit={() => api.put(profilePatch.diff)}
    />
  );
};
```

## License

MIT © [termosa](https://github.com/termosa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
