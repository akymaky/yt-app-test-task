import { H2 } from '@jetbrains/ring-ui-built/components/heading/heading.js';
import React, { memo, useEffect, useState } from 'react';
import { ProjectList } from './components/ProjectList';
import { ProjectItem } from './components/ProjectItem';
import { ListDataItem } from '@jetbrains/ring-ui-built/components/list/consts.js';
import { Projects } from './types/Projects';
import ContentLayout from '@jetbrains/ring-ui-built/components/content-layout/content-layout.js';
import Loader from '@jetbrains/ring-ui-built/components/loader/loader.js';

// Register widget in YouTrack. To learn more, see https://www.jetbrains.com/help/youtrack/devportal-apps/apps-host-api.html
const host = await YTApp.register();

const AppComponent: React.FunctionComponent = () => {
  const [listData, setListData] = useState<ListDataItem[] | null>(null);

  useEffect(() => {
    async function loadProjects() {
      let result = await host.fetchYouTrack('admin/projects', {
        query: { fields: 'name,shortName' },
      });

      if (!result) {
        return;
      }

      const projects = result as Projects;

      result = await host.fetchApp('backend/enabledProjects', {});
      const enabledProjects = result as string[];

      const data = projects.map((p) => ({
        label: p.name,
        key: p.shortName,
        rgItemType: 4,
        template: <ProjectItem project={p} enabled={enabledProjects.includes(p.shortName)} host={host}/>,
      }));
      setListData(data);
    }

    loadProjects();
  }, []);

  return (
    <div className="widget">
      <ContentLayout>
        <H2>Projects</H2>
        {listData ? <ProjectList listData={listData}/> : <Loader message="Loading"/>}
      </ContentLayout>
    </div>
  );
};

export const App = memo(AppComponent);
