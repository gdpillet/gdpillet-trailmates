import { ReactNode } from 'react';

interface DetailViewLayoutProps {
  // Gallery section
  gallery: ReactNode;
  // Main content header
  header: ReactNode;
  // Main content body sections
  mainContent: ReactNode;
  // Sidebar content
  sidebar: ReactNode;
}

const DetailViewLayout = ({
  gallery,
  header,
  mainContent,
  sidebar,
}: DetailViewLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-8 md:py-12">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Gallery Section - 2nd on mobile, 1st on desktop */}
            <div className="w-full lg:w-[380px] flex-shrink-0 order-2 lg:order-1">
              {gallery}
            </div>

            {/* Main Content - 1st on mobile, 2nd on desktop */}
            <div className="flex-1 min-w-0 max-w-full lg:max-w-[650px] order-1 lg:order-2">
              {/* Header */}
              <div className="mb-8">
                {header}
              </div>

              <div className="h-px bg-border" />

              {/* Main Content Sections */}
              <div className="py-8 space-y-8">
                {mainContent}
              </div>
            </div>

            {/* Sidebar - 3rd on mobile, 3rd on desktop */}
            <aside className="w-full lg:w-[340px] flex-shrink-0 lg:sticky lg:top-6 order-3">
              <div className="bg-muted rounded-xl p-6">
                {sidebar}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailViewLayout;
