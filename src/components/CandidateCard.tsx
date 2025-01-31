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
            console.log(data)
            const user = await searchGithubUser(data[index].login);
            setCandidate(user);console.log(user)
        }
        fetchData();
    }, [])

    const handleSaveCandidates = async () => {

            // Saving candidates on local storage by pushing them to the array after getting the ones we have already and adding the new one
            let savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]') || [];
            savedCandidates = savedCandidates.filter((c: CandidateProps) => {
                return c.id !== candidate?.id;
            })
            savedCandidates.push(candidate)
            localStorage.setItem('candidates', JSON.stringify(savedCandidates));

            // setIndex(index + 1)
            // const user = await searchGithubUser(candidatesList[index].login || '');
            // setCandidate(user);
            nextCandidate();
    };

    const nextCandidate = async () => {

      setIndex(index + 1)
      const user = await searchGithubUser(candidatesList[index].login || '');
      console.log(JSON.stringify(user))
      setCandidate(user);
    }
  
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
    <div className='d-flex justify-content-around'>

      <button  onClick={handleSaveCandidates}>
        +
      </button>
      
      <button  onClick={nextCandidate}>
        -
      </button>
      </div>
      </>
    );
}

export default CandidateCard;