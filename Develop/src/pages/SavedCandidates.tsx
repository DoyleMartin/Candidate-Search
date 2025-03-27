import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";


const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("acceptedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("acceptedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login}>
              <img src={candidate.avatarURL} alt={candidate.login} width={50} height={50} />
              <h3>(@{candidate.login})</h3>
              <p>Location: {candidate.location || "N/A"}</p>
              <p>Email: {candidate.email || "N/A"}</p>
              <p>Company: {candidate.company || "N/A"}</p>
              <a href={candidate.HTML_url} target="_blank" rel="noopener noreferrer">
              </a>
              <button onClick={() => removeCandidate(candidate.login)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
