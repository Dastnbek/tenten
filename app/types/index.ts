export interface SerperResponseProps {
  title: string;
  link: string;
  snippet: string;
  date: string;
  position: 1;
}

export interface EachAiResponse {
  name: string;
  info: string;
  title?: string;
}

export interface AiResposneProps {
  title: string;
  list: EachAiResponse[];
}
