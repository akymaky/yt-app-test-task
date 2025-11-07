import React from "react";
import { ListDataItem } from "@jetbrains/ring-ui-built/components/list/consts.js";
import List from "@jetbrains/ring-ui-built/components/list/list.js";

export function ProjectList({ listData } : { listData: ListDataItem[] } ) {
  return listData.length > 0 ? <List compact  data={listData}/> : <span>No projects available, yet.</span>
}
