import React from "react";
import { Project } from "../types/Projects";
import { HostAPI } from "../../../../@types/globals";
import Tag, { TagType } from "@jetbrains/ring-ui-built/components/tag/tag.js";
import { ProjectToggle } from "./ProjectToggle";

type Props = {
  project: Project;
  enabled: boolean;
  host: HostAPI;
};

function randomEnum<T extends Record<string, unknown>>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

export function ProjectItem({ project, enabled, host }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Tag interactive={false} tagType={randomEnum(TagType)}>{project.shortName}</Tag>
      <span style={{ marginLeft: "12px", flex: 1 }}>
        {project.name}
      </span>
      <ProjectToggle project={project} enabled={enabled} host={host}/>
    </div>
  );
}