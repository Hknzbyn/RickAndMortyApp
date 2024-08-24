import {charectersUrl} from '../values/Url';

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const getCharacters = async (
  page: number = 1,
  status: string = '',
  gender: string = '',
): Promise<ApiResponse> => {
  try {
    const url = new URL(charectersUrl);
    url.searchParams.append('page', page.toString());
    if (status) url.searchParams.append('status', status);
    if (gender) url.searchParams.append('gender', gender);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
