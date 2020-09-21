import { ModelRecipe } from "../../Formats"
import { RecipeType } from "../../Context"

export enum DeploymentDataServiceTaskType {
  INSTALL = "install",
  START = "start",
  TEST = "test",
  BUILD = "build",
  CLEAN = "clean",
}

export type DeploymentDataServiceTask = {
  command?: string
}

export type DeploymentDataServiceTasks = { [task in DeploymentDataServiceTaskType]?: DeploymentDataServiceTask }

export type DeploymentDataService = {
  runtime: { name: "nodejs" | "container" }
  dependencies?: { [name: string]: string }
  tasks?: DeploymentDataServiceTasks
}

export type DeploymentData = {
  services?: { [name: string]: DeploymentDataService }
}

export type DeploymentRecipe = Omit<ModelRecipe<RecipeType.DEPLOYMENT>, "id"> & DeploymentData
