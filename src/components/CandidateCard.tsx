import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { CandidateProps } from '../interfaces/Candidate.interface';




const CandidateCard = () => {

    const [candidate, setCandidate] = useState<CandidateProps | null>(null);

    const [index, setIndex] = useState(0);

    const [candidatesList, setCandidatesList] = useState<CandidateProps[]>([]);
  

    useEffect(() => {

        const fetchData = async () => {
            const data = await searchGithub();
            setCandidatesList(data);
            const user = await searchGithubUser(data[index].login);
            setCandidate(user);
        }
        fetchData();
    }, [])

    const handleSaveCandidates = async () => {


        const user = await searchGithubUser(candidatesList[index].login || '');
        setCandidate(user);
        setIndex(index + 1)
        const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]') || [];
        savedCandidates.push(user)
        localStorage.setItem('candidates', JSON.stringify(savedCandidates));

    };
  
    return ( 
    <>
    <h1>CandidateSearch</h1>
    <div className='card'>
      {candidate && (
        <>
          <img src="img_avatar.png" alt="Avatar" className="avatar" />

          <h4>
            {candidate.name || candidate.login} ({candidate.login})
          </h4>
          <h4>Location: {candidate.location}</h4>
          <h4>Email:<a href="email">{candidate.email}</a></h4>
          <h4>Company: {candidate.company}</h4>
          <h4>Bio: {candidate.bio}</h4>
          <div className='div-button'>

          <button style={{borderRadius: "50%", backgroundColor: "green", color:"white", fontSize:"20px"}} onClick={handleSaveCandidates}>
            +
          </button>

          <button style={{borderRadius: "50%", backgroundColor: "red", color:"white", fontSize:"20px"}} onClick={() => {
            setIndex(index + 1)
          }}>
            -
        </button>
        </div>
        </>
      )}
    </div>
    </>
    );
}

export default CandidateCard;