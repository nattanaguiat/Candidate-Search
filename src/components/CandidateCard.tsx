import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { CandidateProps } from '../interfaces/Candidate.interface';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';




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
    <div className='card mx-auto bg-black text-white border-0 rounded-5 overflow-hidden text-start d-flex flex-column gap-1'>
      {candidate && (
        <>
          <img src={candidate.avatar_url} alt="Avatar" className="avatar" />

          <h4>
            {candidate.name || candidate.login} ({candidate.login})
          </h4>
          <h4>Location: {candidate.location}</h4>
          <h4>Email:<a href="email">{candidate.email}</a></h4>
          <h4>Company: {candidate.company}</h4>
          <h4>Bio: {candidate.bio}</h4>
  
        </>
      )}
    </div>
    <div className='justify-content-center gap-5 d-flex'>

      <button className="d-flex align-items-center justify-content-center text-succes" onClick={handleSaveCandidates}>
      {/* <MdAddCircleOutline style={{ fontSize: "50px" }}/> */}
      +
      </button>
      
      <button className="btn d-flex align-items-center justify-content-center text-" onClick={() => {
        setIndex(index + 1)
      }}>
        {/* <MdRemoveCircleOutline /> */}
        -
      </button>
      </div>
    </>
    );
}

export default CandidateCard;