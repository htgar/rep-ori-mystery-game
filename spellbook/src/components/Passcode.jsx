import { useState } from "react";

export default function PasswordImage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const correctPassword = "artefact";
  const imageUrl = "/images/artefact.png";

  const handleSubmit = () => {
    if (input === correctPassword) {
      setUnlocked(true);
      setError(false);
    } else {
      setUnlocked(false);
      setError(true);
    }
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>
      <h2>Enter Password to View Image</h2>
    <input
    type="password"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSubmit();
    }}
    placeholder="Enter password"
    style={{ margin: "1em", padding: "0.5em", fontSize: "1em" }}
    />
      <button
        onClick={handleSubmit}
        style={{ marginLeft: "1em", padding: "0.5em 1em", fontSize: "1em" }}
      >
        Submit
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1em" }}>Incorrect password.</p>
      )}

      {unlocked && (
        <div style={{ marginTop: "1em" }}>
        <p style={{ color: "green", margin: "1em"}}>Congratulations, you have unlocked the artefact</p>
          <img
            src={imageUrl}
            alt="Secret Image"
            style={{ maxWidth: "100%", height: "auto", display: "inline-block" }}
          />
        </div>
      )}
    </div>
  );
}
