import { mock } from "../../mock";

class backendService {
  private API_BASE: string;

  constructor () {
    this.API_BASE = 'http://localhost:3001'
  }

}

export function getReviews() {
  // DO Request

  try {

    return mock.mockReview; 
  } catch (error) {
    
  }
}