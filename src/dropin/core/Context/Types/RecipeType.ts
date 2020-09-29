
export const RecipeTypeRoot = "dropin.recipes"

export enum RecipeTypeCategory {
  AUTH = "dropin.recipes/Auth",
  AUTOMATIONS = "dropin.recipes/Automations",
  CATALOG = "dropin.recipes/Catalog",
  ENDPOINTS = "dropin.recipes/Endpoints",
  OUTPUTS = "dropin.recipes/Outputs",
  OWNERS = "dropin.recipes/Owners",
  STORAGE = "dropin.recipes/Storage",
  WORKFLOW = "dropin.recipes/Workflow",
}

export enum RecipeType {
  COLLECTION = "dropin.recipes/Storage/Collection",
  COMPANY = "dropin.recipes/Owners/Company",
  CONFIG = "dropin.recipes/Storage/Config",
  CONNECTOR = "dropin.recipes/Endpoints/Connector",
  DATABASE = "dropin.recipes/Endpoints/Database",
  DEPLOYMENT = "dropin.recipes/Automations/Deployment",
  DOCKER_REGISTRY = "dropin.recipes/Endpoints/DockerRegistry",
  DOCUMENT = "dropin.recipes/Outputs/Document",
  EVOLUTION = "dropin.recipes/Workflow/Evolution",
  FORM = "dropin.recipes/Outputs/Form",
  GIT_REPOSITORY = "dropin.recipes/Endpoints/GitRepository",
  GROUP = "dropin.recipes/Auth/Group",
  HOSTNAME = "dropin.recipes/Endpoints/Hostname",
  LOGS = "dropin.recipes/Storage/Logs",
  MAP = "dropin.recipes/Outputs/Map",
  METRIC = "dropin.recipes/Storage/Metric",
  MIGRATION = "dropin.recipes/Workflow/Migration",
  MILESTONE = "dropin.recipes/Workflow/Milestone",
  NAMESPACE = "dropin.recipes/Workflow/Namespace",
  OPERATION = "dropin.recipes/Automations/Operation",
  PERMISSION = "dropin.recipes/Auth/Permission",
  PIPELINE = "dropin.recipes/Automations/Pipeline",
  PROJECT = "dropin.recipes/Catalog/Project",
  RECIPE = "dropin.recipes/Catalog/Recipe",
  SECTION = "dropin.recipes/Outputs/Section",
  TOKEN = "dropin.recipes/Auth/Token",
  USER = "dropin.recipes/Owners/User",
  VALUES = "dropin.recipes/Storage/Values",
  VERSION = "dropin.recipes/Workflow/Version",
  VISUALIZATION = "dropin.recipes/Outputs/Visualization",
  VOLUME = "dropin.recipes/Storage/Volume",
}