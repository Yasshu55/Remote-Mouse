
import MobileHome from './components/Mobile/MobileHome';
import BrowserHome from './components/Browser/BrowserHome';
import { headers } from "next/headers";
import { isMobile } from '@/utils/isMobile';

export default function Home() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div>
      {mobileCheck ? <MobileHome /> : <BrowserHome />}
    </div>
  );
}
