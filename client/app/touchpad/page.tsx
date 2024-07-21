import { WebSocketProvider } from '../components/context/WebSocketProvider'
import Keyboard from '../components/Mobile/Keyboard';
import Touchpad from "../components/Mobile/Touchpad"
import { isMobile } from '@/utils/isMobile';
import { headers } from "next/headers";
export default function TouchPadPage() {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div>
        <WebSocketProvider>
          <Touchpad />
        </WebSocketProvider>
    </div>
  )
}
