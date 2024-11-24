import { useLocation } from "react-router-dom";

const useDomainURL = (): { domainURL?: string; domainImg: string } => {
  const location = useLocation();
  const domainURL = location.state?.domainURL; // Access domainURL from state
  const domainImg = location.state?.domainImg; // Access domainImg from
  return { domainURL, domainImg };
};

export default useDomainURL;
