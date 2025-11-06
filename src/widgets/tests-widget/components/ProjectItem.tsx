import React, { useState } from "react";
import { Project } from "../types/Projects";
import Checkbox from "@jetbrains/ring-ui-built/components/checkbox/checkbox.js";
import { HostAPI } from "../../../../@types/globals";

type Props = {
  project: Project;
  enabled: boolean;
  host: HostAPI;
};

export function ProjectItem({ project, enabled, host }: Props) {
  const [isEnabled, setEnabled] = useState(enabled);

  async function toggleEnabled() {
    const oldStatus = isEnabled
    const newStatus = !oldStatus;
    
    setEnabled(newStatus);

    try {
      await host.fetchApp('backend/projectStatus', {
        method: "PUT",
        body: {
          project: project.shortName,
          enabled: newStatus
        },
      })
    }
    catch {
      setEnabled(oldStatus)
    }
  }

  return (
    <div>
      <span>
        {project.shortName} | {project.name}
      </span>
      <Checkbox checked={isEnabled} onChange={toggleEnabled}/>
    </div>
  );
}
