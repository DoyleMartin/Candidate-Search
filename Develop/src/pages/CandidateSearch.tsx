import Candidate from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';


const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate)



const firstCandidate = async () => {
  const gitList = await searchGithub();
  if (gitList.length === 0) {
    console.error('No candidates found');
    return;
  }
  const { login, avatar_url, email, location, company, bio, HTML_url } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    login: login,
    avatarURL: avatar_url,
    email: email,
    location: location,
    company: company,
    bio: bio,
    HTML_url: HTML_url,
  };
  setCandidate(newCandidate);
};

useEffect(() => {
  firstCandidate();
}, []);


const handleMouseClickAccept = async () => {
  console.log('Accepted');
  const gitList = await searchGithub();
  if (gitList.length === 0) {
    console.error('No candidates found');
    return;
  }
  const { login, avatar_url, location, email, company, bio, HTML_url } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    avatarURL: avatar_url,
    login: login,
    location: location,
    email: email,
    company: company,
    bio: bio,
    HTML_url: HTML_url,
  };
  const storedCandidates = JSON.parse(localStorage.getItem('acceptedCandidates') || '[]');
  storedCandidates.push(candidate);
  localStorage.setItem('acceptedCandidates', JSON.stringify(storedCandidates));

  setCandidate(newCandidate);
  console.log(candidate);
};

const handleMouseClickDeny = async () => {
  console.log('Denied');
  const gitList = await searchGithub();
  if (gitList.length === 0) {
    console.error('No candidates found');
    return;
  }
  console.log(gitList);
  const { login, avatar_url, location, email, company, bio, HTML_url } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    avatarURL: avatar_url,
    login: login,
    location: location,
    email: email,
    company: company,
    bio: bio,
    HTML_url: HTML_url,
  };
  setCandidate(newCandidate);
  console.log(candidate);
};


return (
  <div>
    <div>
      <img
        src={candidate.avatarURL || "https://via.placeholder.com/100"}
        alt="No avatar"
      />
      <h2>Login: {candidate.login || "N/A"}</h2>
      <p>Location: {candidate.location || "N/A"}</p>
      <p>Email: {candidate.email || "N/A"}</p>
      <p>Company: {candidate.company || "N/A"}</p>
      <p>Bio: {candidate.bio || "N/A"}</p>
      <p>HTML URL: {candidate.HTML_url || "N/A"}</p>
    </div>
    <div>
      <button onClick={handleMouseClickAccept}>Accept</button>
      <button onClick={handleMouseClickDeny}>Deny</button>
    </div>
  </div>
);
}
export default CandidateSearch;
