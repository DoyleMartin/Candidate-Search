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
  const { login, avatar_url, email, location, company, bio } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    login: login,
    avatarURL: avatar_url,
    email: email,
    location: location,
    company: company,
    bio: bio,
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
  const { login, avatar_url, location, email, company, bio } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    avatarURL: avatar_url,
    login: login,
    location: location,
    email: email,
    company: company,
    bio: bio
  };
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
  const { login, avatar_url, location, email, company, bio } = await searchGithubUser(gitList[0].login);
  const newCandidate: Candidate = {
    avatarURL: avatar_url,
    login: login,
    location: location,
    email: email,
    company: company,
    bio: bio
  };
  setCandidate(newCandidate);
  console.log(candidate);
};


  return (
    <div>
      <div>
        <img src={candidate.avatarURL} alt="None" />
        <div>{candidate.login}</div>
        <div>{candidate.location}</div>
        <div>{candidate.email}</div>
        <div>{candidate.company}</div>
        <div>{candidate.bio}</div>
      </div>
      <div>
        <button onClick={handleMouseClickAccept}>Accept</button>
        <button onClick={handleMouseClickDeny}>Deny</button>
      </div>
    </div>
  );
}

export default CandidateSearch;
