import React, { useState } from "react";
import Toggle from "@jetbrains/ring-ui-built/components/toggle/toggle.js";
import { HostAPI } from "../../../../@types/globals";
import { Project } from "../types/Projects";

type Props = {
  project: Project
  enabled: boolean;
  host: HostAPI;
};

export function ProjectToggle({ project, enabled, host }: Props) {
  const [isEnabled, setEnabled] = useState(enabled);

  async function toggleEnabled() {
    const oldStatus = isEnabled;
    const newStatus = !oldStatus;

    setEnabled(newStatus);

    try {
      await host.fetchApp("backend/projectStatus", {
        method: "PUT",
        body: {
          project: project.shortName,
          enabled: newStatus,
        },
      });
    } catch {
      setEnabled(oldStatus);
    }
  }

  return <Toggle checked={isEnabled} onChange={toggleEnabled}/>;
}
