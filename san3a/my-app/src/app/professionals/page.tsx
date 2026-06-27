import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProfessionalsList from "@/components/professionals/ProfessionalsList";
import MatchScore from "@/components/professionals/MatchScore";

export default function ProfessionalsPage() {
  return (<div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <Navbar/>
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto flex gap-6 flex-col md:flex-row">
          <div className="w-full md:w-80 shrink-0">
            <MatchScore/>
          </div>
          <div className="flex-1">
            <ProfessionalsList/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>);}