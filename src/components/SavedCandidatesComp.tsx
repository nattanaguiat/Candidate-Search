import { useEffect, useState } from 'react';
import { CandidateProps } from '../interfaces/Candidate.interface';


const SavedCandidatesComp = () => {
    const [candidates, setCandidates] = useState<CandidateProps[]>([]);

    // Use Effect to bring data from local storage
    useEffect(() => {
        const storageCandidates = localStorage.getItem('candidates');
        const sameCandidates = storageCandidates ? JSON.parse(storageCandidates) : [];
        setCandidates(sameCandidates);
        console.log(sameCandidates);
    } ,[]);       

    const handleRejectCandidate = (login: string | null) => {
      // get all candidates from local storage
      const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]') || [];

      // creating new array with all the candidates except the one with the input we try to target
      const newCandidates: CandidateProps[] = []
      for (let i = 0; i < savedCandidates.length; i++) {
        if (login !== savedCandidates[i].login){  
          newCandidates.push(savedCandidates[i])  
        }
      }

      // setting new aray on local storage
      localStorage.setItem('candidates', JSON.stringify(newCandidates));
      
      // setCandidates to updatd array
      setCandidates(newCandidates)

    }
  
    return (
      <>
      
        <h1>Potential Candidates</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
  
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <>
                  <td><img src={candidate.avatar_url} alt="avatar" style={{width: "70px", }} /></td>
                  <td>{candidate.name || candidate.login}</td>
                  <td>{candidate.location}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.company}</td>
                  <td>{candidate.bio}</td>
                  <td>
                    <button style={{backgroundColor: "red", borderRadius:"50%", color:"white"}} onClick={() => handleRejectCandidate(candidate.login)}>
                      -
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  export default SavedCandidatesComp;