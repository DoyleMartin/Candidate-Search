// TODO: Create an interface for the Candidate objects returned by the API
    export interface Candidate {
        avatarURL: string;
        login: string;
        location: string;
        email: string;
        company: string;
        bio: string;
        HTML_url: string;
      }
      
      export default Candidate;