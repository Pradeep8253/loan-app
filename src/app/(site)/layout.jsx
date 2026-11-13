/**
 * Site layout — mounts the app shell providers and every global chrome element.
 */
import { ShellProvider } from "@/context/ShellContext";
import { EnquiryProvider } from "@/context/EnquiryContext";
import TopBar from "@/components/shell/TopBar/TopBar";
import Navbar from "@/components/shell/Navbar/Navbar";
import MobileAppBar from "@/components/shell/MobileAppBar/MobileAppBar";
import BottomNav from "@/components/shell/BottomNav/BottomNav";
import Footer from "@/components/shell/Footer/Footer";
import FloatingActions from "@/components/shell/FloatingActions/FloatingActions";
import ScrollProgress from "@/components/shell/ScrollProgress/ScrollProgress";
import Preloader from "@/components/shell/Preloader/Preloader";
import InstallPrompt from "@/components/shell/InstallPrompt/InstallPrompt";
import ServiceWorkerRegister from "@/components/shell/ServiceWorkerRegister/ServiceWorkerRegister";
import OfflineBadge from "@/components/shell/OfflineBadge/OfflineBadge";
import ServicesSheet from "@/components/shell/ServicesSheet/ServicesSheet";
import MoreSheet from "@/components/shell/MoreSheet/MoreSheet";
import EnquiryModal from "@/components/popup/EnquiryModal/EnquiryModal";
import PromoBannerPopup from "@/components/popup/PromoBannerPopup/PromoBannerPopup";
import ToastHost from "@/components/ui/Toast/Toast";
import RevealObserver from "@/components/shell/RevealObserver/RevealObserver";

export default function SiteLayout({ children }) {
  return (
    <ShellProvider>
      <EnquiryProvider>
        <a href="#main" className="skip-link">Skip to content</a>
        <ScrollProgress />
        <OfflineBadge />
        <TopBar />
        <Navbar />
        <MobileAppBar />
        <div className="app-body">
          <main id="main" className="app-main">{children}</main>
          <Footer />
        </div>
        <BottomNav />
        <FloatingActions />
        <ServicesSheet />
        <MoreSheet />
        <EnquiryModal />
        <PromoBannerPopup />
        <InstallPrompt />
        <ToastHost />
        <RevealObserver />
        <Preloader />
        <ServiceWorkerRegister />
      </EnquiryProvider>
    </ShellProvider>
  );
}
