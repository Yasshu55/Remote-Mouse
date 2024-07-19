import { MobileView, BrowserView } from "react-device-detect";
import MobileHome from "./components/Mobile/MobileHome";
import BrowserHome from "./components/Browser/BrowserHome";

export default function Home() {
  return (
    <div>
        <MobileView>
            <MobileHome />
        </MobileView>
        <BrowserView>
            <BrowserHome />
        </BrowserView>
    </div>
  );
}
