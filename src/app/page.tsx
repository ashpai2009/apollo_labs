import { Hero } from "@/components/home/Hero";
import { MissionStrip } from "@/components/home/MissionStrip";
import { Disciplines } from "@/components/home/Disciplines";
import { HowApolloWorks } from "@/components/home/HowApolloWorks";
import { CommunitySection } from "@/components/home/CommunitySection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectSurface } from "@/components/projects/ProjectSurface";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionStrip />
      <ProjectSurface>
        <ProjectGallery />
      </ProjectSurface>
      <Disciplines />
      <HowApolloWorks />
      <CommunitySection />
      <FinalCTA />
    </>
  );
}
