import React from "react";
import usePatch from "use-patch";

/** @type {React.CSSProperties} */
const inputGroupStyles = {
  margin: "0 0 1em",
};

/** @type {React.CSSProperties} */
const inputStyles = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
};

const ProfileEditingExample = () => {
  const profile = { firstName: "Jeff", lastName: "Adams" };
  const profilePatch = usePatch(profile);

  return (
    <div>
      <h3>Origin</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
      <form>
        <h3>Editor</h3>
        <div style={inputGroupStyles}>
          <label>
            First name
            <input
              value={profilePatch.value.firstName}
              onChange={(e) =>
                profilePatch.apply({ firstName: e.target.value })
              }
              style={inputStyles}
            />
          </label>
        </div>
        <div style={inputGroupStyles}>
          <label>
            Last name
            <input
              value={profilePatch.value.lastName}
              onChange={(e) => profilePatch.apply({ lastName: e.target.value })}
              style={inputStyles}
            />
          </label>
        </div>
        <div style={inputGroupStyles}>
          <label>
            Age
            <input
              value={profilePatch.value.age || ""}
              onChange={(e) =>
                profilePatch.apply({ age: +e.target.value || undefined })
              }
              style={inputStyles}
            />
          </label>
        </div>
      </form>
      <h3>The diff</h3>
      <pre>{JSON.stringify(profilePatch.diff, null, 2)}</pre>
    </div>
  );
};

export default ProfileEditingExample;

export const code = `const ProfileEditingExample = () => {
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
};`;
